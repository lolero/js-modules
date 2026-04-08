from langchain_core.chat_history import BaseChatMessageHistory

from apps_langchain_5_pdf.web.api import (
  add_message_to_conversation,
  get_messages_by_conversation_id,
)


class SqlMessageHistory(BaseChatMessageHistory):
  def __init__(self, conversation_id: str):
    self.conversation_id = conversation_id

  @property
  def messages(self):
    return get_messages_by_conversation_id(self.conversation_id)

  def add_message(self, message):
    role = message.type
    if role == "AIMessageChunk":
      role = "ai"
    return add_message_to_conversation(
      conversation_id=self.conversation_id,
      role=role,
      content=message.content,
    )

  def clear(self):
    pass
