from apps_langchain_5_pdf.web import create_app

flask_app = create_app()
celery_app = flask_app.extensions["celery"]
