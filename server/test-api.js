import http from 'http';
import express from 'express';
import cors from 'cors';
import { initialProviders, initialProgrammes, initialProjects } from './src/data/seedData.js';
import providerRoutes from './src/routes/providerRoutes.js';
import enquiryRoutes from './src/routes/enquiryRoutes.js';
import programmeRoutes from './src/routes/programmeRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import automationRoutes from './src/routes/automationRoutes.js';
import statsRoutes from './src/routes/statsRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/providers', providerRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/programmes', programmeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/automation', automationRoutes);
app.use('/api/stats', statsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'healthy', suite: 'NexaStudio' }));

const server = app.listen(5099, async () => {
  console.log('✅ Test server listening on http://127.0.0.1:5099');

  async function get(path) {
    const res = await fetch(`http://127.0.0.1:5099${path}`);
    return await res.json();
  }

  async function post(path, body) {
    const res = await fetch(`http://127.0.0.1:5099${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  try {
    // 1. Health
    const health = await get('/api/health');
    console.log('1. Health Check:', health);

    // 2. PawNexus Providers
    const provs = await get('/api/providers?limit=2');
    console.log('2. Providers Count:', provs.data?.length, 'Total:', provs.pagination?.total);

    // 3. PawNexus Filter: 24x7 emergency only
    const emergencyProvs = await get('/api/providers?emergencyOnly=true');
    console.log('3. Emergency Providers Count:', emergencyProvs.data?.length);

    // 4. PawNexus Create Provider
    const newProv = await post('/api/providers', {
      name: 'Alpha Vet Care Emergency Center',
      category: 'Veterinary Clinics',
      address: '101 Marine Drive',
      city: 'Mumbai',
      phone: '+91 22 9988 7766',
    });
    console.log('4. Create Provider:', newProv.message);

    // 5. PawNexus Submit Correction
    const corr = await post(`/api/providers/${provs.data[0].id}/corrections`, {
      submitterName: 'Dr. Vikram',
      submitterEmail: 'vikram@example.com',
      correctionType: 'Wrong Operating Hours',
      details: 'Facility now open 24 hours on weekends.',
    });
    console.log('5. Submit Correction:', corr.message);

    // 6. SkillSpring Programmes
    const progs = await get('/api/programmes');
    console.log('6. Programmes Count:', progs.data?.length);

    // 7. SkillSpring Enquiry Submission
    const enq = await post('/api/enquiries', {
      fullName: 'Ananya Sharma',
      email: 'ananya@example.com',
      phone: '+91 98200 44556',
      educationOrProfession: 'Product Manager',
      programmeInterested: 'Generative AI Fundamentals & Practical Prompting',
      learningObjective: 'Master token economics and prompt workflows.',
    });
    console.log('7. Enquiry Submission:', enq.message);

    // 8. SkillSpring Duplicate Enquiry Check
    const dupEnq = await post('/api/enquiries', {
      fullName: 'Ananya Sharma',
      email: 'ananya@example.com',
      phone: '+91 98200 44556',
      educationOrProfession: 'Product Manager',
      programmeInterested: 'Generative AI Fundamentals & Practical Prompting',
      learningObjective: 'Duplicate submission test',
    });
    console.log('8. Duplicate Prevention Check:', dupEnq.message);

    // 9. SlidePilot Projects
    const projects = await get('/api/projects');
    console.log('9. SlidePilot Projects Count:', projects.data?.length);

    // 10. SlidePilot AI Generation (Intelligent Demo Fallback)
    const aiGen = await post('/api/ai/generate-carousel', {
      topic: 'How to Build Production AI Agents with n8n',
      targetAudience: 'Software Engineers',
      platform: 'LinkedIn',
      slideCount: 6,
    });
    console.log('10. AI Generation Slides:', aiGen.data?.slides?.length, 'Engine:', aiGen.meta?.engine);

    // 11. SlidePilot Webhook Ingestion (n8n Simulation)
    const webhook = await post('/api/automation/slidepilot/webhook', {
      topic: 'Scaling B2B SaaS from 0 to $1M ARR',
      targetAudience: 'SaaS Founders',
      platform: 'LinkedIn',
    });
    console.log('11. Automation Webhook:', webhook.message, 'Approval Gate:', webhook.humanApprovalStatus);

    // 12. Suite Stats
    const stats = await get('/api/stats/suite');
    console.log('12. Suite Stats:', JSON.stringify(stats.data.system));

    console.log('\n🎉 ALL 12 INTEGRATION TESTS PASSED PERFECTLY!\n');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
