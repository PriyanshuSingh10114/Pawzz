import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProviders, initialProgrammes, initialProjects, initialWorkflowLogs } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_FILE = path.join(__dirname, 'local-storage.json');

function getDefaultData() {
  return {
    providers: [...initialProviders],
    programmes: [...initialProgrammes],
    projects: [...initialProjects],
    enquiries: [],
    corrections: [],
    workflowLogs: [...initialWorkflowLogs],
  };
}

let cache = null;

export function getLocalStore() {
  if (cache) return cache;

  if (fs.existsSync(STORE_FILE)) {
    try {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      cache = JSON.parse(raw);
      // Ensure all collections exist
      if (!cache.providers) cache.providers = [...initialProviders];
      if (!cache.programmes) cache.programmes = [...initialProgrammes];
      if (!cache.projects) cache.projects = [...initialProjects];
      if (!cache.enquiries) cache.enquiries = [];
      if (!cache.corrections) cache.corrections = [];
      if (!cache.workflowLogs) cache.workflowLogs = [...initialWorkflowLogs];
      return cache;
    } catch (err) {
      console.warn('⚠️ [LocalStore] Failed to read store file, reinitializing with defaults:', err.message);
    }
  }

  cache = getDefaultData();
  saveLocalStore();
  return cache;
}

export function saveLocalStore() {
  try {
    if (cache) {
      fs.writeFileSync(STORE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('⚠️ [LocalStore] Failed to persist data to disk:', err.message);
  }
}
