import os

from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import (
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
)
from langchain_core.runnables import RunnablePassthrough
from langchain_core.runnables.history import RunnableWithMessageHistory

from apps_langchain_5_pdf.chat.llms.chatanthropic import build_llm
from apps_langchain_5_pdf.chat.memories.sql_memory import SqlMessageHistory
from apps_langchain_5_pdf.chat.models import ChatArgs
from apps_langchain_5_pdf.chat.vector_stores.chroma import build_retriever


def build_chat(chat_args: ChatArgs):
  retriever = build_retriever(chat_args)
  llm = build_llm(chat_args)
  condense_question_llm = ChatAnthropic(
    model="claude-sonnet-4-20250514",
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    streaming=False,
  )

  condense_question_prompt = ChatPromptTemplate(
    input_variables=["input", "history"],
    messages=[
      MessagesPlaceholder(variable_name="history"),
      HumanMessagePromptTemplate.from_template("{input}"),
      HumanMessagePromptTemplate.from_template(
        "Given the above conversation, rephrase the follow-up question "
        "as a standalone question."
      ),
    ],
  )

  condense_question_chain = condense_question_prompt | condense_question_llm

  qa_prompt = ChatPromptTemplate(
    input_variables=["context", "input", "history"],
    messages=[
      SystemMessagePromptTemplate.from_template(
        "Use the following pieces of context to answer the question at the "
        "end. If you don't know the answer, say you don't know. "
        "Do not make up an answer.\n\n{context}"
      ),
      MessagesPlaceholder(variable_name="history"),
      HumanMessagePromptTemplate.from_template("{input}"),
    ],
  )

  def condense_and_retrieve(inputs):
    condensed = condense_question_chain.invoke(inputs)
    docs = retriever.invoke(condensed.content)
    return "\n\n".join(doc.page_content for doc in docs)

  chain = (
    RunnablePassthrough.assign(context=condense_and_retrieve) | qa_prompt | llm
  )

  chain_with_history = RunnableWithMessageHistory(
    chain,
    lambda session_id: SqlMessageHistory(conversation_id=session_id),
    input_messages_key="input",
    history_messages_key="history",
  )

  return chain_with_history, chat_args.conversation_id
