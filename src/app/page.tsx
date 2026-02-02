import ClientHome from '../components/ClientHome';
import StructuredData from '../components/StructuredData';
import Project from '../models/Project';
import Settings from '../models/Settings';
import Experience from '../models/Experience';
import Skill from '../models/Skill';
import connectToDatabase from '../lib/db';

export const revalidate = 60;

async function getProjects() {
    try {
        await connectToDatabase();
        const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    }
}

async function getSettings() {
    try {
        await connectToDatabase();
        let settings = await Settings.findOne({}).lean();
        if (!settings) {
            return null;
        }
        return JSON.parse(JSON.stringify(settings));
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return null;
    }
}

async function getExperience() {
    try {
        await connectToDatabase();
        const experience = await Experience.find({}).sort({ startDate: -1 }).lean();
        return JSON.parse(JSON.stringify(experience));
    } catch (error) {
        console.error("Failed to fetch experience:", error);
        return [];
    }
}

async function getSkills() {
    try {
        await connectToDatabase();
        const skills = await Skill.find({}).sort({ order: 1, createdAt: 1 }).lean();
        return JSON.parse(JSON.stringify(skills));
    } catch (error) {
        console.error("Failed to fetch skills:", error);
        return [];
    }
}

export default async function Home() {
    const [projects, settings, experience, skills] = await Promise.all([
        getProjects(),
        getSettings(),
        getExperience(),
        getSkills()
    ]);

    return (
        <>
            <StructuredData settings={settings} />
            <ClientHome
                projects={projects}
                settings={settings}
                experience={experience}
                skills={skills}
            />
        </>
    );
}
