# NexaStudio — Complete Product Development, Design & AI Systems Suite

[![Build Status](https://img.shields.io/badge/Build-Passing-emerald)](#)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Vite%20%7C%20Tailwind%20%7C%20Express%20%7C%20MongoDB%20%7C%20OpenAI-indigo)](#)
[![License](https://img.shields.io/badge/Status-Founder--Ready-amber)](#)

> **Developed for the Product Development, Design & AI Systems Intern Assessment.**  
> An interconnected digital product suite demonstrating founder-grade UI/UX architecture, production-ready AI workflows, resilient backend engineering, and autonomous n8n pipeline integration.

---

## 1. Executive Summary & The Three Products

NexaStudio comprises three standalone, interconnected products sharing a unified design philosophy:

| Product | Domain | Value Proposition |
| :--- | :--- | :--- |
| **🐾 PawNexus** | Animal Healthcare Discovery | Emergency vet hospital locator, 24/7 ambulance triage, verified clinic directory, and community correction reporting. |
| **🎓 SkillSpring AI** | Applied AI Education | Cohort landing platform for practical prompt engineering, full-stack AI development, and n8n autonomous workflow skills. |
| **🎨 SlidePilot** | Content Creation & Automation | Autonomous social carousel studio with strict JSON schemas, 5 design templates, single-slide AI rewriting, and multi-page LinkedIn PDF export. |

---

## 2. Technology Stack

### Frontend
- **Framework**: React 18 with Vite for lightning-fast HMR and optimized tree-shaking
- **Styling**: Tailwind CSS with custom Swiss-editorial and neo-brutalist tokens
- **Routing**: React Router DOM (v6) with dynamic product switcher and sub-navbars
- **Icons**: Lucide React (clean vector glyphs; zero generic emojis)
- **Visuals & Motion**: Framer Motion transitions and subtle micro-interaction styling
- **Export Engine**: `html-to-image` for high-resolution PNG rendering & `jspdf` for LinkedIn carousel-compliant multi-page PDFs

### Backend
- **Runtime**: Node.js & Express.js
- **Data Layer**: Dual-mode Mongoose adapter (Persistent MongoDB Atlas with automatic fallback to resilient in-memory demo datastore)
- **Validation**: Strict schema validation with duplicate prevention logic
- **AI Integration**: OpenAI SDK (`gpt-4o-mini` with strict `response_format: { type: "json_object" }`) paired with an intelligent deterministic fallback synthesizer

### Automation & Pipeline
- **Orchestration**: Official n8n workflow integration (`automation/n8n/slidepilot-workflow.json`)
- **Webhooks**: Dedicated listener `/api/automation/slidepilot/webhook`
- **Governance**: Mandatory Human-in-the-Loop review gates (`Draft` → `In Review` → `Approved` → `Exported`)

---

## 3. Repository Architecture & Folder Structure

```
Pawzz/
├── client/                     # Vite + React Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, DemoBanner, Toast Notifications
│   │   │   ├── pawnexus/       # Hero, ServiceCards, ProviderCard, Detail/Register/Correction Modals
│   │   │   ├── skillspring/    # Hero, ProgrammeCard, CurriculumModal, EnquiryForm, Journey, FAQ
│   │   │   └── slidepilot/     # SlideRenderer, SlideEditor, ExportModal, WorkflowDiagram
│   │   ├── pages/
│   │   │   ├── nexastudio/     # Central executive launchpad & founder evaluation portal
│   │   │   ├── pawnexus/       # PawNexus complete discovery experience
│   │   │   ├── skillspring/    # SkillSpring AI academy landing page
│   │   │   └── slidepilot/     # Dashboard, Creator Wizard, Projects, Templates, n8n Workflow
│   │   ├── services/           # Unified API client & html-to-image/jspdf export services
│   │   ├── context/            # Notification toast and application context
│   │   ├── App.jsx             # Unified client-side router
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                     # Express.js REST API Backend
│   ├── src/
│   │   ├── config/             # Environment & dual-mode MongoDB connection
│   │   ├── controllers/        # Provider, Enquiry, Programme, Project, AI, Automation controllers
│   │   ├── data/               # Seed data for clinics, programmes, projects, and workflow logs
│   │   ├── models/             # Mongoose schemas (Provider, Correction, Programme, Enquiry, Project)
│   │   ├── routes/             # REST route definitions
│   │   ├── services/
│   │   │   ├── ai/             # OpenAI service & intelligent fallback synthesizer
│   │   │   └── automation/     # n8n webhook dispatcher & audit logger
│   │   └── index.js            # Express server entry point
│   ├── package.json
│   ├── .env.example
│   └── test-api.js             # Comprehensive 12-test automated integration suite
├── automation/
│   └── n8n/
│       ├── slidepilot-workflow.json  # Importable n8n workflow template
│       └── README.md                 # Setup & webhook testing guide
├── docs/
│   └── architecture/
│       ├── SYSTEM_DESIGN.md    # Multi-product system design & technical trade-offs
│       ├── API_SPEC.md         # Full REST API endpoints documentation
│       └── SLIDEPILOT_WORKFLOW.md # AI JSON schema & governance architecture
├── ASSIGNMENT_SUBMISSION.md    # Founder assessment & self-review document
└── package.json                # Root monorepo workspace scripts
```

---

## 4. Local Quickstart Installation

### Prerequisites
- Node.js (v18 or higher recommended; developed on v22)
- npm or pnpm

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/nexastudio.git
cd nexastudio

# Install client packages
npm --prefix client install

# Install server packages
npm --prefix server install
```

### 2. Environment Variables Setup
Copy `.env.example` in `server/`:
```bash
cp server/.env.example server/.env
```

Contents of `server/.env`:
```env
PORT=5000
NODE_ENV=development

# Optional: Add MongoDB Atlas connection string
# If left empty, system operates in high-fidelity Demo Mode with pre-seeded data
MONGODB_URI=

# Optional: Add OpenAI API Key
# If left empty, SlidePilot triggers its built-in intelligent synthesizer
OPENAI_API_KEY=

# Optional: n8n webhook listener URL
N8N_WEBHOOK_URL=

DEMO_MODE=true
```

### 3. Run the Backend API Server
```bash
npm --prefix server start
# Backend launches at http://localhost:5000
```

### 4. Run the Client Application
```bash
npm --prefix client run dev
# Frontend launches at http://localhost:5173
```

---

## 5. Automated Verification & Testing

NexaStudio includes a comprehensive 12-point automated integration test suite:

```bash
node server/test-api.js
```

### Verified Test Cases:
1. `GET /api/health` — System status and health check
2. `GET /api/providers` — PawNexus clinic discovery and pagination
3. `GET /api/providers?emergencyOnly=true` — 24/7 Emergency hospital filter
4. `POST /api/providers` — Clinic listing with server-side field validation
5. `POST /api/providers/:id/corrections` — Community data correction submission
6. `GET /api/programmes` — SkillSpring course catalogue retrieval
7. `POST /api/enquiries` — Functional admissions lead capture
8. `POST /api/enquiries` (Duplicate) — 409 Conflict duplicate submission rejection
9. `GET /api/projects` — SlidePilot carousel project retrieval
10. `POST /api/ai/generate-carousel` — Strict JSON schema generation
11. `POST /api/automation/slidepilot/webhook` — Inbound webhook with `In Review` human approval gate
12. `GET /api/stats/suite` — Multi-product metric aggregation

---

## 6. How to Demonstrate to the Founder

1. **Start at Executive Central Hub (`/`)**:
   - Inspect the NexaStudio umbrella, live suite metrics, and the self-auditing criteria assessment.
2. **Explore PawNexus (`/pawnexus`)**:
   - Filter by City (e.g., "Mumbai") and toggle "24/7 Emergency Available Only".
   - Click "View Details" on Crown Vet to inspect trauma facilities, reviews, and directions.
   - Click "List Your Facility" or "Submit a correction" to test working modal submissions.
3. **Explore SkillSpring AI (`/skillspring`)**:
   - Click "Syllabus" on any course to open the interactive week-by-week curriculum modal.
   - Submit an admissions enquiry in the form; observe instant client validation and server confirmation.
4. **Explore SlidePilot (`/slidepilot`)**:
   - Click "Create New Carousel". Enter a topic (e.g. "5 Microservices Anti-Patterns").
   - Click "Generate AI Carousel Deck". Watch the AI engine generate 6 structured slides.
   - Reorder slides, click "Reimagine This Slide with AI" to test individual slide regeneration.
   - Switch design templates (`modern-gradient`, `minimal-editorial`, `bold-typography`).
   - Click "Review & Export": mark status as **Approved**, and download the multi-page LinkedIn PDF!
5. **Inspect n8n Automation (`/slidepilot/workflow`)**:
   - Click "Dispatch Webhook Event" to test the live inbound webhook pipeline.
   - Observe the new project appear under "In Review" in the audit log.
