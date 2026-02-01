import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
    name: string;
    icon?: string; // Optional icon class or URL
    order: number;
}

const SkillSchema: Schema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
}, { timestamps: true });

const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
