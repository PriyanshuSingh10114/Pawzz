# NexaStudio Unified REST API Specification

Base URL: `http://localhost:5000/api`

---

## 1. System Health & Stats

### `GET /api/health`
Returns the operational health and environment state of the backend service.
- **Response `200 OK`**:
```json
{
  "status": "healthy",
  "suite": "NexaStudio Unified Backend",
  "version": "1.0.0",
  "timestamp": "2024-11-17T20:00:00.000Z",
  "demoModeActive": true
}
```

### `GET /api/stats/suite`
Aggregates operational metrics across PawNexus, SkillSpring, SlidePilot, and runtime connectivity.

---

## 2. PawNexus Endpoints

### `GET /api/providers`
Fetch providers with full filtering and pagination.
- **Query Parameters**:
  - `search` (string): Keyword matching name, address, or treatments
  - `category` (string): Filter by category
  - `city` (string): Filter by metro area
  - `minRating` (number): Minimum average rating (e.g., 4.5, 4.8)
  - `verifiedOnly` (boolean): Only verified listings
  - `emergencyOnly` (boolean): Only facilities open 24/7
  - `page` (number, default: 1)
  - `limit` (number, default: 12)

### `GET /api/providers/:id`
Fetch single provider detail including facilities, GPS coordinates, opening hours, and pet parent reviews.

### `POST /api/providers`
Register a new veterinary clinic, hospital, boarding facility, or NGO.
- **Request Body**:
```json
{
  "name": "Crown Vet Specialty Hospital",
  "category": "Veterinary Hospitals",
  "address": "Worli, Mumbai",
  "city": "Mumbai",
  "phone": "+91 22 4970 8282",
  "emergencyPhone": "+91 91671 22334",
  "services": ["Trauma ICU", "Orthopedic Surgery"],
  "facilities": ["ICU Isolation", "Blood Bank Access"]
}
```

### `POST /api/providers/:id/corrections`
Submit community or owner corrections for outdated details.
- **Request Body**:
```json
{
  "submitterName": "Dr. Ramesh",
  "submitterEmail": "ramesh@example.com",
  "submitterPhone": "+91 98200 11223",
  "relationshipToBusiness": "Owner/Manager",
  "correctionType": "Wrong Operating Hours",
  "details": "Hospital is now operating 24 hours daily."
}
```

---

## 3. SkillSpring AI Endpoints

### `GET /api/programmes`
Fetch all available educational cohort programmes.

### `GET /api/programmes/:slug`
Fetch syllabus modules and capstone specifications for a given programme slug.

### `POST /api/enquiries`
Submit an admissions lead enquiry.
- **Request Body**:
```json
{
  "fullName": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "+91 98200 99887",
  "educationOrProfession": "Working Professional",
  "programmeInterested": "AI Automation & Workflow Engineering (n8n & Autonomous Agents)",
  "learningObjective": "Automate founder social publishing and lead enrichment."
}
```
- **Responses**:
  - `201 Created`: Enquiry recorded successfully.
  - `409 Conflict`: Duplicate enquiry detected for same email & course.

---

## 4. SlidePilot AI Endpoints

### `GET /api/projects`
List saved carousel projects with status, platform, and search filtering.

### `POST /api/projects`
Persist a newly structured carousel project.

### `PUT /api/projects/:id`
Update slide contents, template styling, reorder indices, or approval status.

### `DELETE /api/projects/:id`
Permanently delete a carousel project.

### `POST /api/ai/generate-carousel`
Execute LLM inference (or intelligent deterministic synthesizer in demo mode) using strict JSON schema.
- **Request Body**:
```json
{
  "topic": "7 AI Tools That Save 20+ Hours a Week for Founders",
  "targetAudience": "Startup Founders",
  "platform": "LinkedIn",
  "contentObjective": "Thought Leadership",
  "tone": "Punchy & Tactical",
  "slideCount": 6
}
```

### `POST /api/ai/regenerate-slide`
Re-synthesize an individual slide based on context and optional custom instructions.

---

## 5. Automation & n8n Endpoints

### `GET /api/automation/status`
Returns n8n webhook connection state and native engine status.

### `GET /api/automation/logs`
Returns the recent execution audit log of workflow runs.

### `POST /api/automation/slidepilot/webhook`
Inbound webhook endpoint receiving trigger ideas from n8n, Slack, or external CRMs.
- Ingests topic and platform
- Runs structured AI generation
- Creates draft project with `status: "In Review"`
- Mandates founder approval before export

