import { SlackEventAdapter } from "@slack/events-api";
import { WebClient } from "@slack/web-api";

const client = new WebClient(String(process.env.SLACK_BOT_TOKEN));
const events = new SlackEventAdapter(String(process.env.SLACK_SIGNING_SECRET));

export { client, events };
