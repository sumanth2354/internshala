import mongoose, { Document, Schema, Model } from 'mongoose';
import { LeadStatus, LeadSource } from '../types/index.js';

export interface ILeadDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

type ILeadModel = Model<ILeadDocument>;

const leadSchema = new Schema<ILeadDocument>(
  {
    name: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost'],
      default: 'New',
    },
    source: {
      type: String,
      enum: ['Website', 'Instagram', 'Referral'],
      required: [true, 'Source is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'CreatedBy is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ name: 'text', email: 'text' });
leadSchema.index({ createdAt: -1 });

export const LeadModel: ILeadModel = mongoose.model<ILeadDocument>(
  'Lead',
  leadSchema
);
