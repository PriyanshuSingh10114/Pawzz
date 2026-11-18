# Pawzz — Product Development, Design & AI Systems Assignment Submission

**Candidate / Developer**: Priyanshu Singh ([priyanshusingh22340@gmail.com](mailto:priyanshusingh22340@gmail.com))  
**Repository**: `Pawzz` (Animal Healthcare, Practical AI Education & Content Automation Platform)  
**Evaluation Scope**: Full-Time Product Engineer Assessment  
**Working Products**:
1. **Pawzz** (`/pawzz` & `/pawzz/search`) — Animal healthcare discovery platform (Practo for Animals)
2. **Upwise** (`/upwise`) — Practical AI and digital-skills education platform
3. **Framewise** (`/framewise`) — Social carousel creation studio

---

## SECTION 1: PAWZZ (ANIMAL HEALTHCARE DISCOVERY)

### 1. MVP Scope & Essential Features
- **Essential Features Included for v1 Launch**:
  - **Comprehensive Multi-Category Directory**: Real-time listings for Veterinary Clinics, Animal Hospitals, Pet Boarding & Daycare, Diagnostic Pathology Labs, Animal Ambulances, and Animal Welfare NGOs.
  - **Dynamic Multi-Parameter Search Engine**: Fuzzy text query by facility name, veterinarian doctor name, equipment, or service; filtered by Indian metropolitan city (`Bengaluru`, `Mumbai`, `Delhi NCR`, `Pune`, `Hyderabad`, `Chennai`) and specialized category.
  - **Emergency & 24/7 ICU Triage**: Dedicated toggle and persistent banner filtering specifically for emergency facilities with round-the-clock intensive care, oxygen support, and active surgical theaters.
  - **High-Trust Healthcare Cards**: Transparent consultation pricing, emergency night tariffs, verified practitioner badges, opening hours, exact physical address, distance calculation, and direct click-to-call links.
  - **Provider Detail Modal**: Expanded clinical overview, doctor qualifications, structured services & pricing table, facility equipment amenities, interactive location map placeholder, and direct appointment enquiry.
  - **Provider Registration Wizard**: Self-serve B2B onboarding for veterinarians, hospital administrators, and shelter directors to list their practice with credentials.
  - **Community Data Correction Form**: Crowdsourced reporting for changed phone numbers, relocated addresses, or closed clinics with staff review verification.
- **What Was Excluded & Why**:
  - *Full In-App Veterinary Teleconsultation & Video Calling*: Real-time WebRTC animal consultations require specialized veterinary diagnostic hardware and high liability insurance; excluded to keep v1 focused on discovery, verification, and rapid physical dispatch.
  - *Payment Processing & Advance Escrow*: Pet emergencies demand immediate care without upfront checkout friction; billing is handled directly at physical facilities.

### 2. Search & Filtering Strategy
- **Search Mechanics**:
  - The persistent search bar accepts combined criteria: text keyword (e.g. "cat surgery", "blood bank", "ultrasound"), city dropdown, and facility taxonomy.
  - Query parameters sync with the browser URL (`/pawzz/search?city=Bengaluru&category=Veterinary+Hospitals&emergency=true&q=ultrasound`), allowing shareable, bookmarkable search results.
- **Essential Filters for Pet Parents**:
  - `24/7 Emergency ICU Only`: In critical trauma or poisoning situations, pet parents cannot waste time calling clinics that close at 8 PM.
  - `Verified Listings Only`: Highlights facilities whose licenses and veterinary council credentials have been audited.
  - `Consultation Fee Range`: Categorized into Budget (< ₹400), Standard (< ₹700), and Specialist (< ₹1000) for complete pricing transparency.
  - `Equipment & Amenities`: Specific checkable facilities including In-House Pharmacy, Surgical Unit, Blood Bank, Oxygen Chamber, Ultrasound/X-Ray, and Dedicated Pet Ambulance.
  - `Minimum Rating`: Filter by 4.0★, 4.5★, or 4.8★ to prioritize proven satisfaction.
- **Category Taxonomy Decisions**:
  - Segmented strictly into 6 clear facility types rather than vague tags to match mental models of pet owners during urgent triage.

### 3. Provider Information Architecture
- **Decision-Making Data Hierarchy**:
  1. *Immediate Identification*: Facility Name, Taxonomy Badge, and 24/7 ICU Tag.
  2. *Geographic & Proximity Signals*: City, neighborhood locality, exact street address, and approximate distance in kilometers.
  3. *Reputation Signals*: Average star rating, audited patient review count, and council verification badge.
  4. *Clinical Breadth*: Tags for specific capabilities (e.g. Orthopedic Surgery, Canine Parvovirus ICU, Microchipping).
  5. *Pricing & Operating Hours*: Clear daytime consultation charges, emergency tariff notes, and current open/closed status.
- **Trust & Verification Signals**:
  - Verification checkmarks tied to state veterinary council registration numbers.
  - Prominent "Submit a Correction" link on every card to empower rescuers and pet parents to keep directory records accurate.

### 4. CTA Strategy
- **Primary CTAs**:
  - "Find a Vet" / "Search Providers": Prominently styled in healthcare emerald green to drive users into the search directory.
  - "Call Facility" (`tel:` link) & "View Full Profile": Immediate actions on every provider card.
  - "Find 24/7 ICU Hospitals" & "Call Ambulance Dispatch": High-contrast rose/red CTAs on emergency banners for urgent crises.
- **Secondary CTAs**:
  - "List Your Business": B2B registration trigger in the navigation and provider section.
  - "Report Correction": Low-friction modal trigger to report outdated contact numbers.

### 5. Mobile Experience Decisions
- **Responsive Architecture**:
  - Sticky search header on mobile viewports with quick horizontal pill scrolling for categories.
  - Filter sidebar collapses into a slide-up bottom modal drawer on mobile (`sm`/`md` screens), preserving maximum vertical screen space for provider cards.
  - All phone numbers render as native mobile dialer links (`tel:+91...`) with 48px touch targets for instantaneous one-tap emergency calling.

---

## SECTION 2: UPWISE (PRACTICAL AI EDUCATION)

### 1. Target Audience & Positioning
- **Target Learners**:
  - Ambitious university students, junior software developers, product managers, and digital builders seeking applied, production-ready AI skills.
- **Why Existing Alternatives Fall Short**:
  - *Academic / Theoretical Courses*: Drown learners in calculus, linear algebra, and model training from scratch, ignoring that 95% of real-world AI applications are built on API orchestration, prompt engineering, and autonomous agent loops.
  - *Low-Quality Video Courses*: Consist of passive 3-minute video lectures that result in tutorial fatigue and zero verifiable portfolio code.
- **Upwise Positioning & Tone**:
  - Editorial, pragmatic, high-standards, and builder-first. Modern serif and clean sans-serif typography on cream and deep navy palette.

### 2. Value Proposition & Structure
- **Headline Strategy**:
  - *"Learn Skills That Move Your Career Forward"* — Direct career outcome focus.
  - Value proposition: Hands-on, project-driven engineering cohorts taught through production code reviews, verified capstone defenses, and zero passive video watching.
- **Social Proof & Credibility Indicators**:
  - 4.9 / 5.0 Learner Satisfaction Rating across 2,400+ graduates.
  - Verifiable on-chain credential issued upon passing the Capstone Defense.
  - 100% 7-day money-back guarantee policy prominently stated in the FAQ.

### 3. Programme Information Architecture
- **4 Flagship Programmes Delivered**:
  1. **Generative AI Fundamentals & Practical Prompting** (4 Weeks | ₹14,999) — LLM architectures, system prompts, structured JSON outputs, OpenAI API, and automated prompt evaluation. Capstone: Production Customer Support AI Agent.
  2. **AI Automation and Workflow Design** (6 Weeks | ₹24,999) — Autonomous agent pipelines, n8n webhook triggers, error-recovery loops, and multi-tool orchestration. Capstone: Autonomous Content Creation & Multi-Platform Publishing Pipeline.
  3. **AI for Product Management & Innovation** (6 Weeks | ₹22,999) — PRD generation with LLMs, AI feature feasibility audits, cost-per-token modeling, and user journey optimization. Capstone: End-to-End AI Feature PRD & Interactive Prototype.
  4. **Full-Stack Digital Product Development** (8 Weeks | ₹29,999) — Modern React 18, Vite, Node.js, Express, MongoDB, and secure API architecture for shipping end-to-end digital SaaS products. Capstone: Full-Stack Digital Product MVP with Live Deployment.
- **Information Balance**:
  - High-level overview cards display duration, fee, next cohort date, tool chips, and capstone title.
  - "View Syllabus" CTA opens an interactive week-by-week curriculum modal with exact module topics and deliverables.

### 4. Registration & Enquiry Journey
- **Information Captured**:
  - Full Name, Email Address, WhatsApp/Phone Number, Current Background (Student, Developer, PM, Designer), Programme of Interest, and Primary Learning Goal.
- **Friction Reduction Strategies**:
  - Pre-population: Clicking "Enquire for this Cohort" on any programme card auto-selects that programme in the form and smooth-scrolls the page directly to the admissions desk.
- **Duplicate Lead Prevention**:
  - Client-side validation for email regex and phone digit length.
  - Backend enforcement: If a user attempts to submit a duplicate enquiry with the same email for the same programme, the API returns `409 Conflict` with a clear advisory message: *"An enquiry with this email has already been registered for this programme. Our admissions advisor has your details."*

---

## SECTION 3: FRAMEWISE (SOCIAL CAROUSEL CREATION WORKFLOW)

### 1. Detailed Content Breakdown: The 10-Slide Sample Carousel
Framewise comes pre-loaded with the requested 10-slide high-leverage sample carousel (*"10 AI Workflows That Can Save Students Hours Every Week"* | ID: `sample-carousel-001`):

1. **Slide 1: Hook Slide**
   - *Headline*: "10 AI Workflows That Can Save Students Hours Every Week"
   - *Tag*: "STUDY SMARTER"
   - *Description*: "Most students use AI like a basic calculator. Top performers use it as a 24/7 research lab, coding mentor, and executive chief of staff. Here are 10 workflows you can copy today."
   - *CTA*: "Swipe to explore →"
2. **Slide 2: The Problem Slide**
   - *Headline*: "The Student Dilemma: Drowning in Readings & Deadlines"
   - *Tag*: "THE PROBLEM"
   - *Description*: "Between 50-page syllabus readings, weekly assignments, exam prep, and internship hunt, manual workflows guarantee burnout. The bottleneck isn't intelligence—it's execution speed."
   - *CTA*: "The solution →"
3. **Slide 3: Workflow 1 — Lecture Synthesizer**
   - *Headline*: "Workflow 1: Audio to Smart Study Notes"
   - *Tag*: "WORKFLOW 01"
   - *Description*: "Record lectures via Whisper or mobile voice memo. Run structured prompt: Extract 5 core theses, key equations, and 3 probable exam questions into clean Markdown."
   - *CTA*: "Next workflow →"
4. **Slide 4: Workflow 2 — Deep-Dive Research Assistant**
   - *Headline*: "Workflow 2: 20 Papers in 20 Minutes"
   - *Tag*: "WORKFLOW 02"
   - *Description*: "Feed PDF research papers to an LLM with semantic retrieval. Prompt: Identify methodology limitations, datasets used, and conflicting conclusions across authors."
   - *CTA*: "Next workflow →"
5. **Slide 5: Workflow 3 — Socratic Exam Drill Partner**
   - *Headline*: "Workflow 3: Active Recall on Steroids"
   - *Tag*: "WORKFLOW 03"
   - *Description*: "Never re-read passive textbooks. Prompt AI: Act as an unforgiving examiner. Quiz me on Chapter 4 one question at a time. Do not reveal answers until I attempt them."
   - *CTA*: "Next workflow →"
6. **Slide 6: Workflow 4 — Code Explainer & Debugger**
   - *Headline*: "Workflow 4: Automated Code Explainer & Debugger"
   - *Tag*: "WORKFLOW 04"
   - *Description*: "Paste stack traces and cryptic error logs into your model. Prompt: Explain the root cause like I am a junior engineer, then rewrite with modern idiomatic patterns."
   - *CTA*: "Next workflow →"
7. **Slide 7: Workflow 5 — Cold Outreach & Internship Pitch**
   - *Headline*: "Workflow 5: Cold Pitch Generator"
   - *Tag*: "WORKFLOW 05"
   - *Description*: "Extract hiring manager recent posts and company tech stack. Generate a 75-word personalized cold email highlighting how your specific projects solve their immediate bottleneck."
   - *CTA*: "Implementation guide →"
8. **Slide 8: Practical Implementation Guide**
   - *Headline*: "The 3-Step Stack: Capture, Synthesize, Execute"
   - *Tag*: "ACTION GUIDE"
   - *Description*: "Step 1: Capture raw audio/text notes. Step 2: Run deterministic prompt templates with structured JSON formatting. Step 3: Review and ship with human judgment."
   - *CTA*: "Avoid common traps →"
9. **Slide 9: Common Mistakes to Avoid**
   - *Headline*: "3 Traps That Waste Time (And How to Avoid Them)"
   - *Tag*: "CRITICAL MISTAKES"
   - *Description*: "1. Blind trust without fact verification. 2. Vague one-sentence prompts. 3. Copy-pasting unedited AI prose without your personal voice and examples."
   - *CTA*: "Final takeaway →"
10. **Slide 10: Closing CTA Slide**
    - *Headline*: "Save This Guide & Build Your First Workflow Today"
    - *Tag*: "NEXT STEPS"
    - *Description*: "Pick one workflow from this carousel and test it on your toughest assignment this week. Bookmark this post for your next study sprint."
    - *CTA*: "Bookmark & Share"

### 2. AI Tool Selection & Prompt Engineering
- **Recommended AI Engine**: OpenAI `gpt-4o-mini` configured with `response_format: { type: "json_object" }`.
- **Structured Schema Enforcement**:
  - The model prompt enforces strict JSON keys: `title`, `topic`, `targetAudience`, `platform`, `slides` (array of objects containing `slideNumber`, `headline`, `tag`, `description`, `visualType`, and `cta`).
- **Multi-Step vs. Single-Prompt Pipeline**:
  - Multi-step pipelining is used: Ideation & Hook generation → Structural Slide Breakdown → Single-Slide Rewrite. This prevents context degradation and ensures that individual slide headlines stay under 80 characters while descriptions stay under 220 characters.

### 3. Design Platform Selection: Trade-Off Analysis
- **Evaluation Matrix**:
  | Platform / Engine | Strengths | Weaknesses | Decision |
  |---|---|---|---|
  | **Canva API** | Familiar user brand | Closed API, paid enterprise keys required, latency on exports | *Rejected for core engine* |
  | **Figma REST API** | High designer flexibility | Asynchronous queue limits, complex OAuth, no programmatic node styling without plugins | *Rejected for core engine* |
  | **Native Web Canvas (HTML/CSS + html-to-image + jsPDF)** | Deterministic rendering, 100% free, zero external API keys needed, instant live preview, runs offline | Requires precise CSS aspect-ratio containment | **SELECTED & IMPLEMENTED** |
- **Why Web Canvas Was Chosen**:
  - It guarantees that any founder or evaluator running the application locally can immediately render, edit, and export pixel-perfect carousels without configuring Canva or Figma developer keys.

### 4. Automation & Integration Architecture
- **n8n Workflow Design**:
  - A complete, production-ready n8n workflow file is embedded in `server/src/workflows/slidepilot-workflow.json`.
  - Flow: **Webhook Trigger** (`POST /api/automation/slidepilot/webhook`) → **Input Validation & Sanitization** → **OpenAI Chat Model Node** (Structured JSON Generation) → **Backend Ingestion Node** (`POST /api/projects`) → **Human-in-the-Loop Review Gate** → **Export Trigger**.
- **Resilient Fallback**:
  - When n8n is not running locally, the server's native automation simulator handles inbound webhook calls, creates real project records, and logs the execution in `/api/automation/logs`.

### 5. Human-in-the-Loop Review
- **Editorial Governance**:
  - Autonomous AI generation never publishes directly to social media.
  - The project enters state `Draft` or `In Review`.
  - The founder reviews each slide in the Framewise Studio, edits headlines/descriptions, reorders slides up or down, triggers single-slide AI rewrites, changes visual templates, and toggles status to `Approved` before exporting.

### 6. Export & Distribution Strategy
- **Instagram Portrait (4:5 Ratio | 1080 × 1350 px)**: High-resolution PNGs exported individually or packaged via canvas rasterization.
- **LinkedIn Document (1:1 Square | 1080 × 1080 px or 4:5)**: Multi-page vector PDF compiled in order via `jspdf`, ready to be uploaded directly as a LinkedIn carousel document.

---

## SECTION 4: TECHNOLOGY, ARCHITECTURE & DECISIONS

### 1. Technology Stack Justification
- **Frontend**:
  - **React 18 + Vite**: Instant hot-module reloading and rapid client-side rendering for real-time canvas updates.
  - **Tailwind CSS**: Utility-first CSS ensuring strict design tokens, responsive breakpoints, and zero CSS runtime overhead.
  - **Lucide React**: Clean, accessible SVG icons replacing amateur emojis.
- **Backend**:
  - **Node.js & Express**: High-concurrency event-driven server for RESTful APIs and asynchronous webhook ingestion.
  - **Dual-Layer Persistence**:
    - *Layer 1 (MongoDB Atlas)*: Used when `MONGODB_URI` is provided.
    - *Layer 2 (Local JSON Disk Store)*: Uses `localStore.js` with atomic file writes to `server/src/data/local-storage.json`. Data persists across server process restarts, process crashes, and computer reboots.
- **AI & Automation**:
  - OpenAI API (`gpt-4o-mini`) with schema validation.
  - Built-in rule-based intelligent fallback generator when no OpenAI key is set.
  - n8n webhook integration with downloadable JSON workflow.

### 2. Known Limitations & Production Roadmap
- **Production Enhancements**:
  - *Direct OAuth Social Publishing*: Integrate LinkedIn Community Management API and Instagram Graph API to publish approved PDFs and image carousels automatically on schedule.
  - *Live Teleconsultation WebRTC*: Integrate Agora or Twilio for live video consultations between veterinarians and pet owners.
  - *Payment Gateway*: Integrate Stripe or Razorpay for cohort tuition installments and clinic booking deposits.

---

**Signed & Submitted by**:  
**Priyanshu Singh**  
Full-Stack Product Engineer  
*November 2026*
