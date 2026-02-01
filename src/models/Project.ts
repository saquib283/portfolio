import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
    github?: string;
    featured: boolean;
    order: number;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    link: { type: String, required: true },
    github: { type: String, default: "" },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    content: { type: String }, // Optional case study content
}, { timestamps: true });

// Prevent overwrite on HMR
const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
