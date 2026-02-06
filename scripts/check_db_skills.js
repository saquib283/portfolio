
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
}, { timestamps: true });

const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

async function checkSkills() {
    try {
        console.log("Connecting to DB...");
        // Use the connection string directly from env
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected. Fetching skills...");
        const skills = await Skill.find({});

        console.log("--- SKILLS DUMP ---");
        skills.forEach(s => {
            console.log(`Name: ${s.name} | Icon: [${s.icon}]`);
        });
        console.log("-------------------");

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

checkSkills();
