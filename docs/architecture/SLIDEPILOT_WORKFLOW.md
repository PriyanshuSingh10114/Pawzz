# SlidePilot AI & Automation Architecture

SlidePilot is engineered to eliminate repetitive design friction for startup founders while establishing strict **governance and validation guardrails**.

---

## 1. End-to-End Pipeline

```
[ Founder Idea / Webhook Trigger ]
               │
               ▼
   [ Payload Validation Layer ]  ──> Rejects empty/malformed topics
               │
               ▼
[ AI Research & Content Matrix ] ──> OpenAI gpt-4o-mini / Intelligent Engine
               │                      - Enforces strict JSON Schema
               │                      - Zero fake statistics rule
               ▼
[ Slide Layout Matrix Generator ]──> Binds headlines, descriptions, visual tags
               │
               ▼
   [ Interactive Slide Editor ]  ──> Reorder, add/delete slides, single-slide AI rewrite
               │
               ▼
   [ Founder Review & Gate ]     ──> Status: 'In Review' ──> 'Approved'
               │
               ▼
  [ High-Resolution Rendering ]  ──> 1080x1350 (IG) & 1080x1080 (LinkedIn)
               │
               ▼
      [ Export Deliverable ]     ──> Download PNG / Multi-Page LinkedIn PDF
```

---

## 2. Strict JSON Schema Contract

Every LLM generation must conform to this schema:

```json
{
  "contentTitle": "Short internal title",
  "mainHook": "1-sentence hook",
  "targetAudience": "Target audience",
  "platform": "LinkedIn | Instagram",
  "coreMessage": "Core takeaway in 1 sentence",
  "slides": [
    {
      "slideNumber": 1,
      "headline": "Punchy slide title (max 8-10 words)",
      "description": "Tactical insight (2-3 sentences)",
      "visualType": "Hero / Framework / Comparison / Metric / Call To Action",
      "tag": "Short badge tag",
      "cta": "Micro-CTA or swipe cue"
    }
  ],
  "caption": "Complete post caption formatted with emojis and linebreaks",
  "hashtags": ["#Tag1", "#Tag2"]
}
```

---

## 3. Human-in-the-Loop Governance

Autonomous AI systems must never be permitted to broadcast unverified content.
SlidePilot enforces a four-stage state machine:

1. **Draft**: Initial generation from wizard.
2. **In Review**: Webhook or newly generated project awaiting visual proofing.
3. **Approved**: Founder has reviewed every slide and confirmed accuracy.
4. **Exported**: Carousel exported to PDF/PNG and archived in project history.
