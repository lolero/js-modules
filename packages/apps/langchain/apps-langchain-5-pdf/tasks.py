import os
from invoke import task


@task(name='init-db')
def init_db(ctx):
    """Initialize the SQLite database."""
    ctx.run(
        'flask --app apps_langchain_5_pdf.web init-db',
        pty=os.name != 'nt',
        env={'APP_ENV': 'development', 'PYTHONPATH': 'src'},
    )


@task
def dev(ctx):
    """Run the Flask development server on port 8000."""
    ctx.run(
        'flask --app apps_langchain_5_pdf.web run --debug --port 8000',
        pty=os.name != 'nt',
        env={'APP_ENV': 'development', 'PYTHONPATH': 'src'},
    )


@task(name='dev-worker')
def dev_worker(ctx):
    """Run the Celery worker with auto-reload."""
    ctx.run(
        'watchmedo auto-restart --directory=./src/apps_langchain_5_pdf --pattern=*.py '
        '--recursive -- celery -A apps_langchain_5_pdf.celery_app.worker worker '
        '--concurrency=1 --loglevel=INFO --pool=solo',
        pty=os.name != 'nt',
        env={'APP_ENV': 'development', 'PYTHONPATH': 'src'},
    )


@task
def redis(ctx):
    """Start Redis server in Docker."""
    ctx.run(
        'docker run --rm -p 6379:6379 --name redis-langchain redis',
        pty=os.name != 'nt',
    )
