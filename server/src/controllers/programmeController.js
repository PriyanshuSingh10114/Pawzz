import { isDbConnected } from '../config/db.js';
import { ProgrammeModel } from '../models/Programme.js';
import { initialProgrammes } from '../data/seedData.js';

export async function getProgrammes(req, res) {
  try {
    if (isDbConnected()) {
      const programmes = await ProgrammeModel.find().lean();
      if (programmes.length > 0) {
        return res.json({ success: true, data: programmes, source: 'mongodb' });
      }
    }

    return res.json({ success: true, data: initialProgrammes, source: 'demo-memory' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getProgrammeBySlug(req, res) {
  try {
    const { slug } = req.params;

    if (isDbConnected()) {
      const programme = await ProgrammeModel.findOne({ slug }).lean();
      if (programme) {
        return res.json({ success: true, data: programme });
      }
    }

    const found = initialProgrammes.find(p => p.slug === slug || p.id === slug);
    if (!found) {
      return res.status(404).json({ success: false, message: 'Programme not found' });
    }

    return res.json({ success: true, data: found, source: 'demo-memory' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
