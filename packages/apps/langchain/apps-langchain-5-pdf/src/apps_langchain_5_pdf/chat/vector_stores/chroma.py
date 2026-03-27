from pathlib import Path

from langchain_chroma import Chroma

from apps_langchain_5_pdf.chat.embeddings.huggingface import embeddings

# Persist Chroma data in the package directory
CHROMA_PERSIST_DIR = Path(__file__).parent.parent.parent.parent.parent / "chroma_data"

vector_store = Chroma(
    collection_name="pdf_embeddings",
    embedding_function=embeddings,
    persist_directory=str(CHROMA_PERSIST_DIR),
)


def build_retriever(chat_args):
    search_kwargs = {"filter": {"pdf_id": chat_args.pdf_id}}
    return vector_store.as_retriever(search_kwargs=search_kwargs)
