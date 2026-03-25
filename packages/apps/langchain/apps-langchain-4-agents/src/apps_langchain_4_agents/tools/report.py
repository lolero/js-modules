from langchain_core.tools import StructuredTool
from pydantic import BaseModel, Field


class WriteReportArgsSchema(BaseModel):
    filename: str = Field(description="The filename to write the report to")
    html: str = Field(description="The HTML content of the report")


def write_report(filename: str, html: str):
    with open(filename, "w") as f:
        f.write(html)


write_report_tool = StructuredTool.from_function(
    name="write_report",
    description="Write an HTML file to disk. Use this tool whenever someone asks for a report.",
    func=write_report,
    args_schema=WriteReportArgsSchema,
)
