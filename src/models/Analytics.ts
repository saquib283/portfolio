import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnalytics extends Document {
    path: string;
    views: number;
    lastVisited: Date;
    dailyStats: { date: string; count: number }[];
}

const AnalyticsSchema: Schema = new Schema({
    path: { type: String, required: true, unique: true },
    views: { type: Number, default: 0 },
    lastVisited: { type: Date, default: Date.now },
    dailyStats: [{
        date: { type: String }, // YYYY-MM-DD
        count: { type: Number, default: 0 }
    }]
}, { timestamps: true });

const Analytics: Model<IAnalytics> = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;
