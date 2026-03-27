from flask import Flask
from flask_cors import CORS

from apps_langchain_5_pdf.web.db import db, init_db_command
from apps_langchain_5_pdf.web.db import models
from apps_langchain_5_pdf.celery_app import celery_init_app
from apps_langchain_5_pdf.web.config import Config
from apps_langchain_5_pdf.web.hooks import load_logged_in_user, handle_error, add_headers
from apps_langchain_5_pdf.web.views import (
    auth_views,
    pdf_views,
    score_views,
    client_views,
    conversation_views,
)


def create_app():
    # Static folder points to the built SvelteKit app
    # For dev, the client runs separately on its own port
    app = Flask(__name__, static_folder=None)
    app.url_map.strict_slashes = False
    app.config.from_object(Config)

    register_extensions(app)
    register_hooks(app)
    register_blueprints(app)
    if Config.CELERY["broker_url"]:
        celery_init_app(app)

    return app


def register_extensions(app):
    db.init_app(app)
    app.cli.add_command(init_db_command)


def register_blueprints(app):
    app.register_blueprint(auth_views.bp)
    app.register_blueprint(pdf_views.bp)
    app.register_blueprint(score_views.bp)
    app.register_blueprint(conversation_views.bp)
    app.register_blueprint(client_views.bp)


def register_hooks(app):
    CORS(app)
    app.before_request(load_logged_in_user)
    app.after_request(add_headers)
    app.register_error_handler(Exception, handle_error)
