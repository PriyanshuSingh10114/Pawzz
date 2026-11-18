const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (error) {
    console.warn(`[API Client Warning] ${endpoint} -> ${error.message}`);
    throw error;
  }
}

// PawNexus Services
export const ProviderService = {
  getAll: (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        searchParams.append(k, v);
      }
    });
    return fetchJson(`/providers?${searchParams.toString()}`);
  },
  getById: (id) => fetchJson(`/providers/${id}`),
  create: (data) =>
    fetchJson('/providers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  submitCorrection: (id, data) =>
    fetchJson(`/providers/${id}/corrections`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// SkillSpring AI Services
export const SkillSpringService = {
  getProgrammes: () => fetchJson('/programmes'),
  getProgrammeBySlug: (slug) => fetchJson(`/programmes/${slug}`),
  submitEnquiry: (data) =>
    fetchJson('/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// SlidePilot AI & Project Services
export const SlidePilotService = {
  getProjects: (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return fetchJson(`/projects?${searchParams.toString()}`);
  },
  getProjectById: (id) => fetchJson(`/projects/${id}`),
  createProject: (data) =>
    fetchJson('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateProject: (id, data) =>
    fetchJson(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteProject: (id) =>
    fetchJson(`/projects/${id}`, {
      method: 'DELETE',
    }),
  generateCarousel: (payload) =>
    fetchJson('/ai/generate-carousel', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  regenerateSlide: (payload) =>
    fetchJson('/ai/regenerate-slide', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getAutomationStatus: () => fetchJson('/automation/status'),
  getAutomationLogs: () => fetchJson('/automation/logs'),
  triggerAutomationTest: (payload) =>
    fetchJson('/automation/test-trigger', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

// Suite Stats
export const SuiteStatsService = {
  getStats: () => fetchJson('/stats/suite'),
};

