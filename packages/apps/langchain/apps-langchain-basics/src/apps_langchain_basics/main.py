import argparse
import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough

load_dotenv(Path(__file__).parent.parent.parent.parent / ".env.dev")

api_key = os.getenv("ANTHROPIC_API_KEY")
llm = ChatAnthropic(model="claude-sonnet-4-20250514", api_key=api_key)

parser = argparse.ArgumentParser()
parser.add_argument("--task", default="return a list of numbers")
parser.add_argument("--language", default="python")
args = parser.parse_args()

code_prompt = PromptTemplate.from_template(
    "Write a very short {language} function that will {task}"
)
test_prompt = PromptTemplate.from_template(
    "Write a test for the following {language} code:\n{code}"
)
code_chain = code_prompt | llm | StrOutputParser()
test_chain = test_prompt | llm | StrOutputParser()

chain = RunnablePassthrough.assign(code=code_chain) | RunnablePassthrough.assign(
    test=test_chain
)

result = chain.invoke({"language": args.language, "task": args.task})

print("=== CODE ===")
print(result["code"])
print("\n=== TEST ===")
print(result["test"])
