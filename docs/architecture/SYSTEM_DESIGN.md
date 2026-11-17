# NexaStudio — System Architecture & Design Specification

## 1. Executive Summary

**NexaStudio** is a unified digital product suite engineered as a multi-product ecosystem sharing a cohesive design philosophy, resilient full-stack architecture, and deterministic AI/automation workflows.

The suite comprises three interconnected products:
1. **PawNexus**: Animal healthcare and emergency support discovery network.
2. **SkillSpring AI**: Applied AI education and workflow engineering cohort platform.
3. **SlidePilot**: Autonomous, human-governed social carousel generation engine for founders.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NexaStudio Unified Gateway                      │
│                  (React 18 + Vite + Tailwind CSS)                      │
└──────┬─────────────────────────┬───────────────────────────────┬───────┘
       │                         │                               │
       ▼                         ▼                               ▼
┌──────────────┐         ┌──────────────┐                ┌───────────────┐
│   PawNexus   │         │ SkillSpring  │                │  SlidePilot   │
│  Discovery   │         │  AI Academy  │                │  AI Studio    │
└──────┬───────┘         └──────┬───────┘                └───────┬───────┘
       │                        │                                │
       └────────────────────────┼────────────────────────────────┘
                                │ JSON API
                                ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      NexaStudio Backend API                            │
│                 (Node.js + Express + Dual Data Layer)                  │
├────────────────────────────────────────────────────────────────────────┤
│  Persistence: MongoDB Atlas / Resilient In-Memory Demo Store          │
│  AI Engine: OpenAI gpt-4o-mini / Native Deterministic Synthesizer      │
│  Automation: n8n Inbound Webhook Listener + Outbound Trigger           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Global Design System Principles

- **Swiss Grid & Typography**: Uses `Inter` for hyper-legible body interfaces and `Plus Jakarta Sans` for high-impact brand headings.
- **Micro-Interactions**: Smooth state transitions, hover elevations (`shadow-card-hover`), and active press states without distracting animations.
- **Accessibility & Contrast**: Conforms to WCAG AA color contrast standards across dark and light modes.
- **Zero Placeholder Syndrome**: All buttons trigger functional modals, copy actions, state mutations, or external links. No non-functional buttons or fake links.
- **Lucide Icons**: Replaces generic emoji graphics with cohesive, stroke-consistent SVG vectors.

---

## 3. Product-Specific Architectural Implementations

### 3.1 PawNexus (Animal Healthcare Platform)
- **Directory Query Engine**: Multi-dimensional filtering across:
  - Search keyword (matches clinic name, address, treatments)
  - City hub (Mumbai, Bengaluru, Delhi NCR, Pune, Hyderabad)
  - Service category (Clinics, Hospitals, Boarding, Diagnostics, Ambulance, NGOs)
  - Minimum user rating threshold (4.5+, 4.8+)
  - 24/7 Emergency trauma readiness
  - Verified provider status
- **Interactive Modals**:
  - `ProviderDetailModal`: Displays emergency dispatch phone lines, equipment, opening hours, directions, and reviews.
  - `RegisterProviderModal`: Enables veterinary directors and NGOs to register facilities with client and server-side validation.
  - `SubmitCorrectionModal`: Enables community verification to submit corrections for wrong phones, hours, or relocations.

### 3.2 SkillSpring AI (AI Education Platform)
- **Cohort Curriculum Visualizer**: Deep-dive interactive modal displaying week-by-week topic syllabi, learning outcomes, and capstones.
- **Admissions Lead Capture**: Strict validation for name, email, phone, background, and learning goals.
- **Duplicate Prevention**: Rejects rapid duplicate submissions for identical email and course combinations (409 Conflict) with courteous user alerts.

### 3.3 SlidePilot (AI Content Studio & Automation)
- **6-Step Creation Pipeline**:
  1. *Idea Intake*: Captures topic, audience, platform, tone, slide count (3-10), reference notes.
  2. *AI Generation*: Structured JSON schema guarantees slide-by-slide headlines, descriptions, visual tags, and swipe cues.
  3. *Slide Editor*: Slide-by-slide editor allowing reordering, insertion, deletion, and single-slide AI regeneration.
  4. *Design Tokens*: 5 templates (`minimal-editorial`, `modern-gradient`, `corporate`, `educational-infographic`, `bold-typography`).
  5. *Dual Aspect Ratio*: Supports 4:5 Instagram Portrait (1080x1350) and 1:1 LinkedIn Square (1080x1080).
  6. *Export Engine*: Generates individual high-res PNGs and multi-page LinkedIn-ready PDF documents using `html-to-image` and `jspdf`.
- **Founder Approval Workflow**: Content progresses from `Draft` → `In Review` → `Approved` → `Exported`. No unapproved publication is permitted.

---

## 4. Resilience & Fallback Engineering

NexaStudio is designed to be **founder-ready out of the box**:
- **Zero-Config Demo Mode**: When `MONGODB_URI` or `OPENAI_API_KEY` are not provided, the application runs seamlessly using a resilient in-memory datastore with pre-seeded realistic clinics and courses, and a rule-based intelligent AI synthesizer.
- **Production Mode**: When secrets are provided in `server/.env`, the system automatically connects to live MongoDB Atlas and OpenAI `gpt-4o-mini`.

