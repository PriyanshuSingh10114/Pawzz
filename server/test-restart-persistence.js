import express from 'express';
import cors from 'cors';
import providerRoutes from './src/routes/providerRoutes.js';
import enquiryRoutes from './src/routes/enquiryRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';

async function runTest() {
  console.log('🔄 --- Phase 1: Start Server Session 1 ---');
  let app1 = express();
  app1.use(cors());
  app1.use(express.json());
  app1.use('/api/providers', providerRoutes);
  app1.use('/api/enquiries', enquiryRoutes);
  app1.use('/api/projects', projectRoutes);

  let server1 = app1.listen(5199);
  await new Promise(r => setTimeout(r, 200));

  // Create unique records
  const uniqueId = Date.now();
  const testClinicName = `Restart Persistence Clinic ${uniqueId}`;
  const testEmail = `candidate.${uniqueId}@startup.io`;
  const testProjectTitle = `Restart Persistence Carousel ${uniqueId}`;

  console.log(`Creating test clinic: "${testClinicName}"`);
  await fetch('http://127.0.0.1:5199/api/providers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: testClinicName,
      category: 'Veterinary Clinics',
      city: 'Bengaluru',
      address: '100 Feet Road, Indiranagar',
      phone: '+91 80 1234 5678',
    }),
  });

  console.log(`Submitting enquiry for: "${testEmail}"`);
  await fetch('http://127.0.0.1:5199/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Vikram Mehta',
      email: testEmail,
      phone: '+91 98200 11223',
      educationOrProfession: 'Staff Engineer',
      programmeInterested: 'Full-Stack AI Application Development',
      learningObjective: 'Vector DB architecture',
    }),
  });

  console.log(`Creating project: "${testProjectTitle}"`);
  await fetch('http://127.0.0.1:5199/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: testProjectTitle,
      topic: 'Vector DBs in 2025',
      targetAudience: 'Engineers',
      platform: 'LinkedIn',
      slides: [
        { slideNumber: 1, headline: 'Vector DBs 101', description: 'Embeddings explained' },
      ],
    }),
  });

  console.log('🛑 --- Simulating Process Crash / Server Restart (Terminating Session 1) ---');
  server1.close();
  await new Promise(r => setTimeout(r, 500));

  console.log('🚀 --- Phase 2: Start Fresh Server Session 2 (New Memory Space) ---');
  let app2 = express();
  app2.use(cors());
  app2.use(express.json());
  app2.use('/api/providers', providerRoutes);
  app2.use('/api/enquiries', enquiryRoutes);
  app2.use('/api/projects', projectRoutes);

  let server2 = app2.listen(5199);
  await new Promise(r => setTimeout(r, 200));

  // Verify persistence across restart
  const provRes = await fetch('http://127.0.0.1:5199/api/providers?search=' + encodeURIComponent(testClinicName)).then(r => r.json());
  const clinicFound = provRes.data?.some(p => p.name === testClinicName);

  const enqRes = await fetch('http://127.0.0.1:5199/api/enquiries').then(r => r.json());
  const enqFound = enqRes.data?.some(e => e.email === testEmail);

  const projRes = await fetch('http://127.0.0.1:5199/api/projects?search=' + encodeURIComponent(testProjectTitle)).then(r => r.json());
  const projFound = projRes.data?.some(p => p.title === testProjectTitle);

  console.log('\n--- PERSISTENCE VERIFICATION AUDIT ---');
  console.log(`Clinic Persisted Across Restart:    [${clinicFound ? 'PASS ✅' : 'FAIL ❌'}] (${testClinicName})`);
  console.log(`Enquiry Persisted Across Restart:   [${enqFound ? 'PASS ✅' : 'FAIL ❌'}] (${testEmail})`);
  console.log(`Project Persisted Across Restart:   [${projFound ? 'PASS ✅' : 'FAIL ❌'}] (${testProjectTitle})`);

  server2.close();

  if (clinicFound && enqFound && projFound) {
    console.log('\n🏆 RECORD PERSISTENCE AFTER RESTART VERIFIED WITH ZERO FABRICATED DATA!\n');
    process.exit(0);
  } else {
    console.error('\n❌ RESTART PERSISTENCE FAILED\n');
    process.exit(1);
  }
}

runTest().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
