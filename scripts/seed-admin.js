import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.ts'; // We might need to handle imports carefully if running with node directly, using ts-node or just compiling on the fly.
// Actually, standard node scripts with import need "type": "module" in package.json which we have.
// But valid relative paths are needed.

import dotenv from 'dotenv';
dotenv.config(); // Loads .env by default
// Optionally load .env.local to override
dotenv.config({ path: '.env.local', override: true });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'md.rehan22b@gmail.com';
        const password = 'Rehan@283'; // Change this!
        const hashedPassword = await bcrypt.hash(password, 12);

        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('Admin user already exists');
        } else {
            await User.create({
                email,
                password: hashedPassword,
                name: 'Admin',
            });
            console.log('Admin user created');
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seed();
