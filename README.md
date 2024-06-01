## Slack Bot

Slack bot built with Node.js and Express.js that leverages anthropic for chat completion, Slack Web API for sending messages, Slack Events API for listening to messages and Trigger.dev for background tasks.

## Features

- Chat completion using anthropic
- Send messages to Slack
- Listen to messages from Slack
- Background tasks using Trigger.dev

## Setup Instructions

### Installation

1. Clone the repository

```bash
git clone https://github.com/Kritik-J/slack-bot
```

2. Install dependencies

```bash
npm install
```

3. Copy the `.env.example` file to `.env`

```bash
cp .env.example .env
```

### Trigger.dev setup

Grab Trigger.dev credentials from the dashboard and update the `.env` file

1. Navigate to the Trigger.dev dashboard [Trigger.dev](https://cloud.trigger.dev/)
2. Create a new project v3, If you don't have one
3. Navigate to the project settings page and grab the project id and set it in the `.env` file as `TRIGGER_PROJECT_ID`
4. Navigate to the API keys page and grab the api key and set it in the `.env` file as `TRIGGER_SECRET_KEY`

> Note: As of now Trigger.dev v3 is still in developer preview.

### Anthropic setup

Navigate to [Anthropic](https://anthropic.com/api) and create an account. Grab the api key and set it in the `.env` file as `ANTHROPIC_API_KEY`

### Start the server

1. Start the server

```bash
npm run dev
```

2. Start Trigger.dev

```bash
npm run dev:trigger
```

3. Start ngrok

```bash
ngrok http your_port
```

### Setup Slack

1. Create a Slack app

Navigate to [Slack API](https://api.slack.com/apps) click on `Create New App` and choose `From scratch`. Fill in the required details and click on `Create App`.

2. Install the app to your workspace

Navigate to `OAuth & Permissions`, scroll down to `Scopes` and add the following scopes to bot token scopes: `chat:write`. Click on `Install to Workspace`.

3. Get the Bot User OAuth Token

Once the app is installed to your workspace, You will find the `Bot User OAuth Token` under `OAuth & Permissions` section. Copy the token and paste it in the `.env` file as `SLACK_BOT_TOKEN`

4. Subscribe to the events

Navigate to `Event Subscriptions`, enable events and paste the ngrok URL followed by `/slack/events` in the `Request URL` field. Subscribe to the following bot events: `app_mention`

5. Signing Secret

Navigate to `Basic Information` and copy the `Signing Secret` and paste it in the `.env` file as `SLACK_SIGNING_SECRET`

## Deployment

1. Deploy trigger.dev tasks

```bash
npx trigger.dev@beta deploy
```

> Note: Make sure to set environment variables in the Trigger.dev dashboard

2. Deploy your server to a cloud provider like railway, heroku, etc.

> Note: Make sure to set environment variables in the cloud provider dashboard as well, Also replace the ngrok URL with the deployed server URL in the Slack app settings.
