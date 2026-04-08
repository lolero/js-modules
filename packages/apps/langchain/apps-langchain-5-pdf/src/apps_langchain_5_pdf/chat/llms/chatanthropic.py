import os

from langchain_anthropic import ChatAnthropic


def build_llm(chat_args):
  return ChatAnthropic(
    model="claude-sonnet-4-20250514",
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    streaming=chat_args.streaming,
  )
