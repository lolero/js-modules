# apps-langchain-5-pdf

PDF chat application with Flask backend and LangChain.

## Available Scripts

From this package directory (`packages/apps/langchain/apps-langchain-5-pdf`):

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `inv init-db`    | Initialize the SQLite database     |
| `inv dev`        | Run Flask server on port 8000      |
| `inv dev-worker` | Run Celery worker with auto-reload |
| `inv redis`      | Start Redis server (Docker)        |

Run `inv --list` to see all available tasks.

## First Time Setup

```bash
# From monorepo root - install all Python dependencies
pnpm install:python

# Copy env file and fill in your keys
cd packages/apps/langchain/apps-langchain-5-pdf
cp .env.example .env

# Initialize the database
inv init-db
```

## Running the App

Four processes need to run concurrently (each in a separate terminal):

### 1. Redis (message broker)

```bash
cd packages/apps/langchain/apps-langchain-5-pdf
inv redis
```

### 2. Flask server (API on port 8000)

```bash
cd packages/apps/langchain/apps-langchain-5-pdf
inv dev
```

### 3. Celery worker (background tasks)

```bash
cd packages/apps/langchain/apps-langchain-5-pdf
inv dev-worker
```

### 4. SvelteKit client (UI on port 5173)

```bash
pnpm --filter @js-modules/apps-langchain-5-pdf-web dev
```

## Reset Database

```bash
cd packages/apps/langchain/apps-langchain-5-pdf
inv init-db
```
