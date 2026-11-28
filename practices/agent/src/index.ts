import "./configs";
import { agent } from "./llm/base-llm";

agent.invoke({
  messages: [
    {
      role: "human",
      content: "What's the weather in San Francisco?",
    },
  ],
}).then(console.log);