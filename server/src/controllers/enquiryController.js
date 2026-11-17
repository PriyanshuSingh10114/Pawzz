import { isDbConnected } from '../config/db.js';
import { EnquiryModel } from '../models/Enquiry.js';

let inMemoryEnquiries = [];

export async function submitEnquiry(req, res) {
  try {
    const {
      fullName,
      email,
      phone,
      educationOrProfession,
      programmeInterested,
      learningObjective,
    } = req.body;

    // Strict validation
    if (!fullName || !email || !phone || !educationOrProfession || !programmeInterested || !learningObjective) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required. Please check your form entries.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Duplicate check
    if (isDbConnected()) {
      const existing = await EnquiryModel.findOne({
        email: cleanEmail,
        programmeInterested,
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'An enquiry for this email and programme has already been received. Our admissions team will contact you shortly!',
        });
      }

      const enquiry = await EnquiryModel.create({
        fullName: fullName.trim(),
        email: cleanEmail,
        phone: phone.trim(),
        educationOrProfession,
        programmeInterested,
        learningObjective,
        status: 'New',
      });

      return res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully! An admissions advisor will reach out within 24 hours.',
        data: enquiry,
      });
    }

    // In-memory duplicate check
    const existingMemory = inMemoryEnquiries.find(
      e => e.email === cleanEmail && e.programmeInterested === programmeInterested
    );

    if (existingMemory) {
      return res.status(409).json({
        success: false,
        message: 'An enquiry for this email and programme has already been received. Our admissions team will reach out shortly!',
      });
    }

    const demoEnquiry = {
      id: `enq-${Date.now()}`,
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      educationOrProfession,
      programmeInterested,
      learningObjective,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    inMemoryEnquiries.unshift(demoEnquiry);

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! An admissions advisor will reach out within 24 hours.',
      data: demoEnquiry,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getEnquiries(req, res) {
  try {
    if (isDbConnected()) {
      const enquiries = await EnquiryModel.find().sort({ createdAt: -1 }).lean();
      return res.json({ success: true, data: enquiries });
    }
    return res.json({ success: true, data: inMemoryEnquiries, source: 'demo-memory' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
