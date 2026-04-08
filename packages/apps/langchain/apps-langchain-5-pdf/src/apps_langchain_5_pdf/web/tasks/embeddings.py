from celery import shared_task

from apps_langchain_5_pdf.chat import create_embeddings_for_pdf
from apps_langchain_5_pdf.web.db.models import Pdf
from apps_langchain_5_pdf.web.files import download


@shared_task()
def process_document(pdf_id: int):
  pdf = Pdf.find_by(id=pdf_id)
  with download(pdf.id) as pdf_path:
    create_embeddings_for_pdf(pdf.id, pdf_path)
