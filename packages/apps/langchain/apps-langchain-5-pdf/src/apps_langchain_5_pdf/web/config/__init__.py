import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[5] / ".env.dev")


class Config:
  SESSION_PERMANENT = True
  SECRET_KEY = os.environ["SECRET_KEY"]
  SQLALCHEMY_DATABASE_URI = os.environ["SQLALCHEMY_DATABASE_URI"]
  UPLOAD_URL = os.environ["UPLOAD_URL"]
  CELERY = {
    "broker_url": os.environ.get("REDIS_URI", False),
    "task_ignore_result": True,
    "broker_connection_retry_on_startup": False,
  }
