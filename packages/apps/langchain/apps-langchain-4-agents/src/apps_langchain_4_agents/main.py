import os
from pathlib import Path

from dotenv import load_dotenv
from handlers.chat_model_start_handler import ChatModelStartHandler
from langchain_anthropic import ChatAnthropic
from langchain_core.runnables import RunnableConfig
from langchain.agents import create_agent
from langgraph.checkpoint.memory import MemorySaver
from tools.report import write_report_tool
from tools.sql import describe_tables_tool, list_tables, run_query_tool

load_dotenv(Path(__file__).resolve().parents[3] / ".env.dev")

handler = ChatModelStartHandler()
api_key = os.getenv("ANTHROPIC_API_KEY")
llm = ChatAnthropic(
    model="claude-sonnet-4-20250514", api_key=api_key, callbacks=[handler]
)

tables = list_tables()

tools = [describe_tables_tool, run_query_tool, write_report_tool]

checkpointer = MemorySaver()

agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt=(
        "You are an AI assistant with access to a SQLite database.\n"
        f"The database has tables of: {tables}\n"
        "Do not make any assumptions about what tables exist or what columns "
        "exist. Instead, use the 'describe_tables' function."
    ),
    checkpointer=checkpointer,
    debug=True,
)

config: RunnableConfig = {"configurable": {"thread_id": "session-1"}}

# result = agent.invoke({"messages": [("user", "how many users are there?")]})
# result = agent.invoke({"messages": [("user", "How many open orders do we have?")]})
# result = agent.invoke(
#     {"messages": [("user", "How many users have provided a shipping address?")]}
# )
# result = agent.invoke(
#     {
#         "messages": [
#             (
#                 "Summarize the top 5 most popular products. Write the results to a report file"
#             )
#         ]
#     }
# )
result = agent.invoke(
    {
        "messages": [
            ("user", "How many orders are there? Write the results to a report file.")
        ]
    },
    config,
)
print("\n=== ANSWER 1 ===")
print(result["messages"][-1].content)

result = agent.invoke(
    {"messages": [("user", "Repeat the exact same process for users.")]},
    config,
)
print("\n=== ANSWER 2 ===")
print(result["messages"][-1].content)
