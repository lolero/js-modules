import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)
from langchain_core.runnables import RunnablePassthrough
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv(Path(__file__).parent.parent.parent.parent / ".env.dev")

api_key = os.getenv("ANTHROPIC_API_KEY")
llm = ChatAnthropic(model="claude-sonnet-4-20250514", api_key=api_key)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma(
    persist_directory="emb",
    embedding_function=embeddings,
)

retriever = db.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 4, "fetch_k": 10, "lambda_mult": 0.5},
)


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


# prompt = ChatPromptTemplate.from_template(
#     "Answer the question based only on the following context:\n\n"
#     "{context}\n\n"
#     "Question: {question}"
# )
prompt = ChatPromptTemplate(
    input_variables=["context", "question"],
    messages=[
        SystemMessagePromptTemplate.from_template(
            "Answer the question based only on the provided context. Be concise."
        ),
        HumanMessagePromptTemplate.from_template(
            "Context:\n{context}\n\nQuestion: {question}"
        ),
    ],
)

chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

question = "What is an interesting fact about the English language?"
result = chain.invoke(question)

print(f"Question: {question}\n")
print(f"Answer: {result}")
