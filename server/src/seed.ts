import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import { UserModel } from './models/user.model.js';
import { LeadModel } from './models/lead.model.js';

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await UserModel.deleteMany({});
    await LeadModel.deleteMany({});

    console.log('Creating users...');
    const adminUser = await UserModel.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    const salesUser = await UserModel.create({
      name: 'Sales Rep',
      email: 'sales@example.com',
      password: 'password123',
      role: 'sales',
    });

    console.log('Creating example leads...');
    const names = [
      'Alice Smith', 'Bob Johnson', 'Charlie Williams', 'Diana Brown', 'Evan Davis',
      'Fiona Miller', 'George Wilson', 'Hannah Moore', 'Ian Taylor', 'Julia Anderson',
      'Kevin Thomas', 'Laura Jackson', 'Michael White', 'Nina Harris', 'Oscar Martin'
    ];
    
    const statuses = ['New', 'Contacted', 'Qualified', 'Lost'];
    const sources = ['Website', 'Instagram', 'Referral'];

    const leadsToInsert = names.map((name, index) => {
      const email = name.toLowerCase().replace(' ', '.') + '@example.com';
      return {
        name,
        email,
        status: statuses[index % statuses.length],
        source: sources[index % sources.length],
        createdBy: index % 2 === 0 ? adminUser._id : salesUser._id,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)), // Random date in past
      };
    });

    await LeadModel.insertMany(leadsToInsert);

    console.log('✅ Seed data generated successfully!');
    console.log('--------------------------------------------------');
    console.log('You can now log in with:');
    console.log('Admin: admin@example.com / password123');
    console.log('Sales: sales@example.com / password123');
    console.log('--------------------------------------------------');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
