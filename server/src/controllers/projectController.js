import { isDbConnected } from '../config/db.js';
import { ProjectModel } from '../models/Project.js';
import { getLocalStore, saveLocalStore } from '../data/localStore.js';

export async function getProjects(req, res) {
  try {
    const { status, platform, search, page = 1, limit = 10 } = req.query;

    if (isDbConnected()) {
      const query = {};
      if (status && status !== 'All') query.status = status;
      if (platform && platform !== 'All') query.platform = platform;
      if (search) query.title = { $regex: search, $options: 'i' };

      const skip = (Number(page) - 1) * Number(limit);
      const total = await ProjectModel.countDocuments(query);
      const projects = await ProjectModel.find(query).sort({ updatedAt: -1 }).skip(skip).limit(Number(limit)).lean();

      return res.json({
        success: true,
        data: projects,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)) || 1,
        },
      });
    }

    const store = getLocalStore();
    let filtered = [...store.projects];
    if (status && status !== 'All') {
      filtered = filtered.filter(p => p.status === status);
    }
    if (platform && platform !== 'All') {
      filtered = filtered.filter(p => p.platform === platform);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q));
    }

    const total = filtered.length;
    const skip = (Number(page) - 1) * Number(limit);
    const paginated = filtered.slice(skip, skip + Number(limit));

    return res.json({
      success: true,
      data: paginated,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)) || 1,
      },
      source: 'demo-memory',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getProjectById(req, res) {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const project = await ProjectModel.findById(id).lean();
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, data: project });
    }

    const store = getLocalStore();
    const project = store.projects.find(p => p.id === id || p._id === id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return res.json({ success: true, data: project, source: 'demo-local-store' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function createProject(req, res) {
  try {
    const projectData = req.body;
    if (!projectData.title || !projectData.slides || projectData.slides.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Project title and at least one slide are required.',
      });
    }

    if (isDbConnected()) {
      const created = await ProjectModel.create(projectData);
      return res.status(201).json({ success: true, data: created });
    }

    const newProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      _id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: projectData.status || 'Draft',
    };
    const store = getLocalStore();
    store.projects.unshift(newProject);
    saveLocalStore();

    return res.status(201).json({ success: true, data: newProject, source: 'demo-local-store' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (isDbConnected()) {
      const updated = await ProjectModel.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, data: updated });
    }

    const store = getLocalStore();
    const index = store.projects.findIndex(p => p.id === id || p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    store.projects[index] = {
      ...store.projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveLocalStore();

    return res.json({ success: true, data: store.projects[index], source: 'demo-local-store' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await ProjectModel.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, message: 'Project deleted successfully' });
    }

    const store = getLocalStore();
    const index = store.projects.findIndex(p => p.id === id || p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    store.projects.splice(index, 1);
    saveLocalStore();
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

