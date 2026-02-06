import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPricingTier extends Document {
    title: string;
    price: string; // Store as string to handle currency symbols or "Custom"
    priceINR?: string; // Specific price for India
    description: string;
    features: string[];
    services: string[];
    deliveryTime: string;
    revisions: string;
    isPopular: boolean;
    buttonText: string;
    buttonLink: string;
    order: number;
}

const PricingTierSchema: Schema = new Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    priceINR: { type: String }, // Optional
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    services: { type: [String], default: [] },
    deliveryTime: { type: String, default: "Standard" },
    revisions: { type: String, default: "Unlimited" },
    isPopular: { type: Boolean, default: false },
    buttonText: { type: String, default: "Get Started" },
    buttonLink: { type: String, default: "/#contact" },
    order: { type: Number, default: 0 },
}, { timestamps: true });

// Prevent Mongoose OverwriteModelError in development
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.PricingTier;
}

const PricingTier: Model<IPricingTier> = mongoose.models.PricingTier || mongoose.model<IPricingTier>('PricingTier', PricingTierSchema);

export default PricingTier;
