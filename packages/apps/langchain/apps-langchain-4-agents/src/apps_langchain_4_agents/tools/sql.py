import sqlite3
from pathlib import Path

from langchain_core.tools import Tool
from pydantic import BaseModel, Field

db_path = Path(__file__).parent.parent / "db.sqlite"


def list_tables():
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute("SELECT name FROM sqlite_master WHERE type='table';")
    rows = c.fetchall()
    conn.close()
    return "\n".join([row[0] for row in rows if row[0] is not None])


class DescribeTablesArgsSchema(BaseModel):
    table_names: list[str] = Field(description="A list of table names to describe")


def describe_tables(table_names: list[str]):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    tables = ", ".join(f"'{table}'" for table in table_names)
    c.execute(
        f"SELECT sql FROM sqlite_master WHERE type='table' and name IN ({tables});"
    )
    rows = c.fetchall()
    conn.close()
    return "\n".join(row[0] for row in rows if row[0] is not None)


describe_tables_tool = Tool.from_function(
    name="describe_tables",
    description="Given a list of table names, return the schema of those tables.",
    func=describe_tables,
    args_schema=DescribeTablesArgsSchema,
)


class RunQueryArgsSchema(BaseModel):
    query: str = Field(description="The SQL query to execute")


def run_sqlite_query(query: str):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    try:
        c.execute(query)
        result = c.fetchall()
    except sqlite3.OperationalError as err:
        result = f"The following error occurred: {str(err)}"
    finally:
        conn.close()
    return result


run_query_tool = Tool.from_function(
    name="run_sqlite_query",
    description="Run a sqlite query.",
    func=run_sqlite_query,
    args_schema=RunQueryArgsSchema,
)
