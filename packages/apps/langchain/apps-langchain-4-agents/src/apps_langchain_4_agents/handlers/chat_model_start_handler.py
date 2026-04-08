from langchain_core.callbacks import BaseCallbackHandler
from pyboxen import boxen


def boxen_print(*args, **kwargs):
  print(boxen(*args, **kwargs))


class ChatModelStartHandler(BaseCallbackHandler):
  def on_chat_model_start(self, serialized, messages, **kwargs):
    print("\n\n\n\n========= Sending Messages =========\n\n")

    for message in messages[0]:
      if message.type == "system":
        boxen_print(message.content, title=message.type, color="yellow")

      elif message.type == "human":
        boxen_print(message.content, title=message.type, color="green")

      elif message.type == "ai" and message.tool_calls:
        # Claude uses tool_calls instead of function_call
        for tool_call in message.tool_calls:
          boxen_print(
            f"Running tool {tool_call['name']} with args {tool_call['args']}",
            title=message.type,
            color="cyan",
          )

      elif message.type == "ai":
        boxen_print(message.content, title=message.type, color="blue")

      elif message.type == "tool":
        # Claude uses 'tool' instead of 'function'
        boxen_print(message.content, title=message.type, color="purple")

      else:
        boxen_print(message.content, title=message.type)
