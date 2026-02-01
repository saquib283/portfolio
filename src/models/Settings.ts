import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
    hero: {
        title: string;
        subtitle: string;
        ctaText: string;
    };
    about: {
        title: string;
        description: string;
        skills: string[];
    };
    contact: {
        email: string;
        phone: string;
        linkedin: string;
        github: string;
        githubUsername?: string;
        spotifyTrackId?: string;
        resume?: string; // URL to resume
        twitter?: string;
    };
    visibility: {
        hero: boolean;
        about: boolean;
        projects: boolean;
        experience: boolean;
        blog: boolean;
        guestbook: boolean;
        contact: boolean;
    };
    features: {
        aiChat: boolean;
        audio: boolean;
        threeDHero: boolean;
        tiltCards: boolean;
        viewCounter: boolean;
        themeToggle: boolean;
        githubPulse: boolean;
        spotifyTracker: boolean;
    };
}

const SettingsSchema: Schema = new Schema({
    hero: {
        title: { type: String, default: "Designing the Digital Future" },
        subtitle: { type: String, default: "I am a Full Stack Developer passionate about crafting intuitive web applications." },
        ctaText: { type: String, default: "View Projects" },
    },
    about: {
        title: { type: String, default: "More than just code." },
        description: { type: String, default: "I bridge the gap between design and engineering." },
        skills: { type: [String], default: [] },
    },
    contact: {
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        githubUsername: { type: String, default: "" },
        spotifyTrackId: { type: String, default: "" },
        resume: { type: String, default: "" },
        twitter: { type: String, default: "" },
    },
    visibility: {
        hero: { type: Boolean, default: true },
        about: { type: Boolean, default: true },
        projects: { type: Boolean, default: true },
        experience: { type: Boolean, default: true },
        blog: { type: Boolean, default: true },
        guestbook: { type: Boolean, default: true },
        contact: { type: Boolean, default: true },
    },
    features: {
        aiChat: { type: Boolean, default: true },
        audio: { type: Boolean, default: true },
        threeDHero: { type: Boolean, default: true },
        tiltCards: { type: Boolean, default: true },
        viewCounter: { type: Boolean, default: true },
        themeToggle: { type: Boolean, default: true },
        githubPulse: { type: Boolean, default: true },
        spotifyTracker: { type: Boolean, default: true },
    }
}, { timestamps: true });

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
