import { logger, task } from "@trigger.dev/sdk/v3";
import Anthropic from "@anthropic-ai/sdk";
import { anthropic } from "../lib/anthropic.js";
import { client } from "../lib/slack.js";

export const generatePostMessage = task({
  id: "generate-message",
  run: async (
    payload: {
      prompt: string;
      event: { channel: string; user: string };
    },
    { ctx }
  ) => {
    const { prompt, event } = payload;

    logger.log("AI chat completion start ✨", { payload, ctx });

    const { completion } = await anthropic.completions.create({
      model: "claude-2.1",
      max_tokens_to_sample: 1024,
      temperature: 0.5,
      prompt: `${Anthropic.HUMAN_PROMPT} ${prompt}${Anthropic.AI_PROMPT}`,
    });

    if (!completion) {
      throw new Error("No completion generated");
    }

    logger.log("AI chat completion done 🌟", { completion });

    logger.log("Sending message to Slack 🚀", { event });

    const res = await client.chat.postMessage({
      channel: event.channel,
      text: `<@${event.user}>\n\n${completion}`,
    });

    if (!res.ok) {
      throw new Error(`Error sending message to Slack: ${res.error}`);
    }

    logger.log("Message sent to Slack 🎉", { res });

    return {
      message: `Message: ${completion} sent to user: ${event.user} of channel: ${event.channel}🥳`,
    };
  },
});
