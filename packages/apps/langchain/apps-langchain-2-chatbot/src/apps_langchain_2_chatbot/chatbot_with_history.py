import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain_community.chat_message_histories import FileChatMessageHistory
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
)
from langchain_core.runnables.history import RunnableWithMessageHistory

load_dotenv(Path(__file__).resolve().parents[3] / ".env.dev")

api_key = os.getenv("ANTHROPIC_API_KEY")
llm = ChatAnthropic(model="claude-sonnet-4-20250514", api_key=api_key)

prompt = ChatPromptTemplate(
    input_variables=["content", "history"],
    messages=[
        SystemMessagePromptTemplate.from_template(
            "You are a helpful assistant. Be concise in your responses."
        ),
        MessagesPlaceholder(variable_name="history"),
        HumanMessagePromptTemplate.from_template("{content}"),
    ],
)

chain = prompt | llm

history_file = str(Path(__file__).parent / "messages.json")

chain_with_history = RunnableWithMessageHistory(
    chain,
    lambda session_id: FileChatMessageHistory(file_path=history_file),
    input_messages_key="content",
    history_messages_key="history",
)

print('Chatbot ready. Type "quit" to exit.\n')

while True:
    content = input(">> ")

    if content.lower() == "quit":
        break

    result = chain_with_history.invoke(
        {"content": content},
        config={"configurable": {"session_id": "default"}},
    )

    print(f"\n{result.content}\n")
