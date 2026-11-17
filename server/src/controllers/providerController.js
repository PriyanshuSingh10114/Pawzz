import { isDbConnected } from '../config/db.js';
import { ProviderModel } from '../models/Provider.js';
import { CorrectionModel } from '../models/Correction.js';
import { getLocalStore, saveLocalStore } from '../data/localStore.js';

export async function getProviders(req, res) {
  try {
    const {
      search = '',
      category = 'All',
      city = 'All',
      minRating = 0,
      verifiedOnly = 'false',
      emergencyOnly = 'false',
      page = 1,
      limit = 12,
    } = req.query;

    if (isDbConnected()) {
      const query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }
      if (category && category !== 'All') {
        query.category = category;
      }
      if (city && city !== 'All') {
        query.city = city;
      }
      if (Number(minRating) > 0) {
        query.rating = { $gte: Number(minRating) };
      }
      if (verifiedOnly === 'true') {
        query.isVerified = true;
      }
      if (emergencyOnly === 'true') {
        query.is24x7 = true;
      }

      const skip = (Number(page) - 1) * Number(limit);
      const total = await ProviderModel.countDocuments(query);
      const providers = await ProviderModel.find(query).skip(skip).limit(Number(limit)).lean();

      return res.json({
        success: true,
        data: providers,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
        source: 'mongodb',
      });
    }

    // Persistent demo store filter
    const store = getLocalStore();
    let filtered = [...store.providers];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.services?.some(s => s.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (city && city !== 'All') {
      filtered = filtered.filter(p => p.city.toLowerCase() === city.toLowerCase());
    }

    if (Number(minRating) > 0) {
      filtered = filtered.filter(p => p.rating >= Number(minRating));
    }

    if (verifiedOnly === 'true') {
      filtered = filtered.filter(p => p.isVerified);
    }

    if (emergencyOnly === 'true') {
      filtered = filtered.filter(p => p.is24x7);
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

export async function getProviderById(req, res) {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const provider = await ProviderModel.findById(id).lean();
      if (!provider) {
        return res.status(404).json({ success: false, message: 'Provider not found' });
      }
      return res.json({ success: true, data: provider });
    }

    const store = getLocalStore();
    const provider = store.providers.find(p => p.id === id || p._id === id);
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    return res.json({ success: true, data: provider, source: 'demo-memory' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function createProvider(req, res) {
  try {
    const {
      name,
      category,
      address,
      city,
      phone,
      emergencyPhone,
      email,
      website,
      openingHours,
      services,
      facilities,
      description,
    } = req.body;

    if (!name || !category || !address || !city || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, Category, Address, City and Phone are required fields.',
      });
    }

    const parsedServices = Array.isArray(services)
      ? services
      : typeof services === 'string'
      ? services.split(',').map(s => s.trim()).filter(Boolean)
      : ['General Care'];

    const parsedFacilities = Array.isArray(facilities)
      ? facilities
      : typeof facilities === 'string'
      ? facilities.split(',').map(f => f.trim()).filter(Boolean)
      : [];

    const newProvider = {
      name,
      category,
      address,
      city,
      phone,
      emergencyPhone: emergencyPhone || '',
      email: email || '',
      website: website || '',
      openingHours: openingHours || 'Mon-Sat: 9:00 AM - 8:00 PM',
      services: parsedServices,
      facilities: parsedFacilities,
      description: description || 'Comprehensive animal healthcare and welfare services.',
      isVerified: false,
      is24x7: openingHours?.toLowerCase().includes('24') || false,
      rating: 5.0,
      reviewCount: 1,
      distanceKm: 3.0,
      reviews: [
        {
          author: 'PawNexus Verification Team',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          comment: 'New listing submitted by owner. Verification badge pending administrative audit.',
        },
      ],
    };

    if (isDbConnected()) {
      const created = await ProviderModel.create(newProvider);
      return res.status(201).json({
        success: true,
        message: 'Provider listing submitted successfully!',
        data: created,
      });
    }

    const demoProvider = {
      ...newProvider,
      id: `pawnexus-prov-${Date.now()}`,
      _id: `pawnexus-prov-${Date.now()}`,
    };
    const store = getLocalStore();
    store.providers.unshift(demoProvider);
    saveLocalStore();

    return res.status(201).json({
      success: true,
      message: 'Provider listing submitted successfully! (Saved & Persisted)',
      data: demoProvider,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function submitCorrection(req, res) {
  try {
    const { id } = req.params;
    const {
      submitterName,
      submitterEmail,
      submitterPhone,
      relationshipToBusiness,
      correctionType,
      details,
    } = req.body;

    if (!submitterName || !submitterEmail || !correctionType || !details) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, correction type and details are required.',
      });
    }

    // Find provider name
    let providerName = 'Unknown Provider';
    const store = getLocalStore();
    if (isDbConnected()) {
      const p = await ProviderModel.findById(id);
      if (p) providerName = p.name;
    } else {
      const p = store.providers.find(prov => prov.id === id || prov._id === id);
      if (p) providerName = p.name;
    }

    const correctionData = {
      providerId: id,
      providerName,
      submitterName,
      submitterEmail,
      submitterPhone: submitterPhone || '',
      relationshipToBusiness: relationshipToBusiness || 'Customer/Visitor',
      correctionType,
      details,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    if (isDbConnected()) {
      const created = await CorrectionModel.create(correctionData);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your correction report has been logged for staff verification.',
        data: created,
      });
    }

    const demoCorrection = {
      ...correctionData,
      id: `corr-${Date.now()}`,
    };
    store.corrections.push(demoCorrection);
    saveLocalStore();

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your correction report has been logged for staff verification.',
      data: demoCorrection,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

