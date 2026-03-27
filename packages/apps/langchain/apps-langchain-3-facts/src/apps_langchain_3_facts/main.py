import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain_chroma import Chroma
from langchain_community.document_loaders import TextLoader
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import CharacterTextSplitter

load_dotenv(Path(__file__).resolve().parents[3] / ".env.dev")

api_key = os.getenv("ANTHROPIC_API_KEY")
llm = ChatAnthropic(model="claude-sonnet-4-20250514", api_key=api_key)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

text_splitter = CharacterTextSplitter(separator="\n", chunk_size=200, chunk_overlap=0)
loader = TextLoader("facts.txt")
docs = loader.load_and_split(text_splitter=text_splitter)

db = Chroma.from_documents(docs, embedding=embeddings, persist_directory="emb")

# Create retriever
results = db.similarity_search_with_score(
    "What is an interesting fact about the English language"
)

for result in results:
    print("\n")
    print(result[1])
    print(result[0].page_content)
