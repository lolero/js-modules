import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
)

load_dotenv(Path(__file__).parent.parent.parent / ".env.dev")

api_key = os.getenv("ANTHROPIC_API_KEY")
llm = ChatAnthropic(model="claude-sonnet-4-20250514", api_key=api_key)

# Main chat prompt
prompt = ChatPromptTemplate(
    input_variables=["content", "summary"],
    messages=[
        SystemMessagePromptTemplate.from_template(
            "You are a helpful assistant. Be concise in your responses."
        ),
        MessagesPlaceholder(variable_name="summary", optional=True),
        HumanMessagePromptTemplate.from_template("{content}"),
    ],
)

chain = prompt | llm

# Summarization chain
summary_prompt = ChatPromptTemplate.from_template(
    "Update this conversation summary with the new exchange. Be concise.\n\n"
    "Current summary: {summary}\n\n"
    "New exchange:\nUser: {user_msg}\nAssistant: {ai_msg}\n\n"
    "Updated summary:"
)
summary_chain = summary_prompt | llm | StrOutputParser()

# Just keep the running summary
summary = ""

print('Chatbot ready. Type "quit" to exit.\n')

while True:
    content = input(">> ")

    if content.lower() == "quit":
        break

    # Build summary message if exists
    summary_messages = []
    if summary:
        summary_messages = [SystemMessage(content=f"Conversation so far: {summary}")]

    # Invoke chain
    result = chain.invoke(
        {
            "content": content,
            "summary": summary_messages,
        }
    )

    print(f"\n{result.content}\n")

    # Update summary with this exchange
    old_summary = summary
    summary = summary_chain.invoke(
        {
            "summary": summary or "No previous conversation.",
            "user_msg": content,
            "ai_msg": result.content,
        }
    )

    print(f"--- Summary ---")
    print(f"Before: {old_summary or '(empty)'}")
    print(f"After:  {summary}")
    print(f"---------------\n")
