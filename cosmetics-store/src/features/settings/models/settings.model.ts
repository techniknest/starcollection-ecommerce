import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  storeName: string;
  slogan: string;
  whatsappNumber: string;
  supportEmail: string;
  address: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema(
  {
    storeName: { type: String, default: "Stars Collection" },
    slogan: { type: String, default: "Experience excellence in every purchase." },
    whatsappNumber: { type: String, default: "923149328645" },
    supportEmail: { type: String, default: "orders.starscollection@gmail.com" },
    address: { type: String, default: "TANCHI CHOWK, MOTI BAZAR, ABBOTTABAD" },
    instagramUrl: { type: String, default: "https://www.instagram.com/staars_collection?igsh=Z3Q5eGdocjJjZm5z" },
    tiktokUrl: { type: String, default: "https://www.tiktok.com/@stars.collection35?_r=1&_t=ZS-95WcjdWh3Wz" },
  },
  { timestamps: true }
);

// Ensure only one settings document exists
export const Settings = mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
