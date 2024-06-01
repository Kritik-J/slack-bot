import express, { Application } from "express";
import { events } from "./lib/slack.js";
import { generatePostMessage } from "./trigger/bot.js";

const app: Application = express();

app.use("/slack/events", events.expressMiddleware());

events.on("app_mention", async (event) => {
  if (event.type === "app_mention") {
    const prompt = event.text.replace(/<@[\w\d]+>/g, "").trim();

    await generatePostMessage.trigger({
      prompt,
      event,
    });
  }
});

events.on("error", (error) => {
  console.log(JSON.stringify(error, null, 2));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
