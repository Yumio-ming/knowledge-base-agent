import { createAgent } from "langchain";
import { getWeather } from "../tools/get-weather";

export const agent = createAgent({
  model: "claude-sonnet-4-6",
  tools: [getWeather],
});