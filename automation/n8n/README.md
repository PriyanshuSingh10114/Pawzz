# SlidePilot n8n Automation Architecture

This folder contains the official **n8n workflow template** and setup instructions for SlidePilot's autonomous carousel generation engine.

## Overview

SlidePilot connects to n8n to enable automated, trigger-based content production (e.g. from Slack messages, RSS feeds, Notion ideas, or CRM status updates) while enforcing a strict **Founder-in-the-Loop Approval Gate** before any content is published or exported.

```
External Idea / Webhook Trigger
           │
           ▼
[n8n Webhook Intake]
           │
           ▼
[Payload Validation & Schema Guard]
           │
           ▼
[OpenAI LLM Node - Structured JSON Matrix]
           │
           ▼
[SlidePilot Ingestion API (/api/automation/slidepilot/webhook)]
           │
           ▼
[Status Set to 'In Review' — Draft Created]
           │
           ▼
[Founder Visual Review & Slide Editor]
           │
           ▼
[Explicit Human Approval ("Approved")]
           │
           ▼
[Export to LinkedIn PDF / Instagram PNG]
```

## How to Import into n8n

1. Open your n8n dashboard (cloud or self-hosted: `http://localhost:5678`).
2. Navigate to **Workflows** → Click **Add Workflow** (`+`).
3. In the top-right menu, select **Import from File...**.
4. Choose `automation/n8n/slidepilot-workflow.json`.
5. Connect your **OpenAI Credential** in the `OpenAI - Structured Carousel Generation` node.
6. Verify the target endpoint URL in `Send Draft to SlidePilot for Human Approval`:
   - Local: `http://localhost:5000/api/automation/slidepilot/webhook`
   - Production: `https://your-nexastudio-backend.onrender.com/api/automation/slidepilot/webhook`
7. Click **Save** and toggle the workflow to **Active**.

## Testing the Pipeline

You can trigger the webhook using `curl` or Postman:

```bash
curl -X POST http://localhost:5678/webhook/slidepilot-idea-trigger \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "5 Engineering Practices Every Tech Lead Must Enforce",
    "targetAudience": "Software Engineers & Tech Leads",
    "platform": "LinkedIn"
  }'
```

SlidePilot will immediately ingest the payload, generate the slide cards, set the status to **In Review**, and surface it on the SlidePilot Dashboard under **Workflow History**.

