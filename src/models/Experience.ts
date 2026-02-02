import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
    technologies: string[];
}

const ExperienceSchema: Schema = new Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
}, { timestamps: true });

const Experience: Model<IExperience> = mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;


//trigger 