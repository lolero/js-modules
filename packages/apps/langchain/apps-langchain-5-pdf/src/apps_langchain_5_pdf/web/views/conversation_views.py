from flask import Blueprint, Response, g, jsonify, request, stream_with_context

from apps_langchain_5_pdf.chat import ChatArgs, build_chat
from apps_langchain_5_pdf.web.db.models import Conversation, Pdf
from apps_langchain_5_pdf.web.hooks import load_model, login_required

bp = Blueprint("conversation", __name__, url_prefix="/api/conversations")


@bp.route("/", methods=["GET"])
@login_required
@load_model(Pdf, lambda r: r.args.get("pdf_id"))
def list_conversations(pdf):
  return [c.as_dict() for c in pdf.conversations]


@bp.route("/", methods=["POST"])
@login_required
@load_model(Pdf, lambda r: r.args.get("pdf_id"))
def create_conversation(pdf):
  conversation = Conversation.create(user_id=g.user.id, pdf_id=pdf.id)

  return conversation.as_dict()


@bp.route("/<string:conversation_id>/messages", methods=["POST"])
@login_required
@load_model(Conversation)
def create_message(conversation):
  input = request.json.get("input")
  streaming = request.args.get("stream", False)

  pdf = conversation.pdf

  chat_args = ChatArgs(
    conversation_id=conversation.id,
    pdf_id=pdf.id,
    streaming=streaming,
    metadata={
      "conversation_id": conversation.id,
      "user_id": g.user.id,
      "pdf_id": pdf.id,
    },
  )

  result = build_chat(chat_args)

  if not result:
    return "Chat not yet implemented!"

  chain, conversation_id = result
  config = {"configurable": {"session_id": conversation_id}}

  if streaming:

    def generate():
      for chunk in chain.stream({"input": input}, config=config):
        if hasattr(chunk, "content"):
          yield chunk.content

    return Response(
      stream_with_context(generate()), mimetype="text/event-stream"
    )
  else:
    response = chain.invoke({"input": input}, config=config)
    return jsonify({"role": "assistant", "content": response.content})
