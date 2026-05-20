import { Response } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import { LeadModel } from '../models/lead.model';
import { AuthenticatedRequest, ILead } from '../types/index';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { generateLeadsCsv } from '../utils/csvExport';

const createLeadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

const updateLeadSchema = createLeadSchema.partial();

const leadsQuerySchema = z.object({
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  source: z.enum(['Website', 'Instagram', 'Referral']).optional(),
  search: z.string().optional(),
  sort: z.enum(['latest', 'oldest']).optional().default('latest'),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
});

const buildLeadQuery = (filters: z.infer<typeof leadsQuerySchema>): mongoose.FilterQuery<object> => {
  const query: mongoose.FilterQuery<object> = {};

  if (filters.status) query.status = filters.status;
  if (filters.source) query.source = filters.source;
  if (filters.search && filters.search.trim()) {
    query.$text = { $search: filters.search.trim() };
  }

  return query;
};

export const getLeads = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const filters = leadsQuerySchema.parse(req.query);
    const query = buildLeadQuery(filters);

    const sortOrder = filters.sort === 'oldest' ? 1 : -1;
    const skip = (filters.page - 1) * filters.limit;

    const [leads, total] = await Promise.all([
      LeadModel.find(query)
        .populate('createdBy', 'name email role')
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(filters.limit)
        .lean(),
      LeadModel.countDocuments(query),
    ]);

    sendSuccess(res, 200, 'Leads fetched successfully.', {
      leads,
      pagination: {
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit),
      },
    });
  }
);

export const createLead = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      sendError(res, 401, 'Not authenticated.');
      return;
    }

    const validatedData = createLeadSchema.parse(req.body);

    const lead = await LeadModel.create({
      ...validatedData,
      createdBy: new mongoose.Types.ObjectId(req.user.userId),
    });

    const populatedLead = await lead.populate('createdBy', 'name email role');

    sendSuccess(res, 201, 'Lead created successfully.', populatedLead);
  }
);

export const getLeadById = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      sendError(res, 400, 'Invalid lead ID format.');
      return;
    }

    const lead = await LeadModel.findById(id).populate(
      'createdBy',
      'name email role'
    );

    if (!lead) {
      sendError(res, 404, 'Lead not found.');
      return;
    }

    sendSuccess(res, 200, 'Lead fetched successfully.', lead);
  }
);

export const updateLead = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      sendError(res, 400, 'Invalid lead ID format.');
      return;
    }

    const validatedData = updateLeadSchema.parse(req.body);

    const lead = await LeadModel.findByIdAndUpdate(
      id,
      { $set: validatedData },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email role');

    if (!lead) {
      sendError(res, 404, 'Lead not found.');
      return;
    }

    sendSuccess(res, 200, 'Lead updated successfully.', lead);
  }
);

export const deleteLead = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      sendError(res, 400, 'Invalid lead ID format.');
      return;
    }

    const lead = await LeadModel.findByIdAndDelete(id);

    if (!lead) {
      sendError(res, 404, 'Lead not found.');
      return;
    }

    sendSuccess(res, 200, 'Lead deleted successfully.');
  }
);

export const exportLeadsCsv = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const filters = leadsQuerySchema.parse(req.query);
    const query = buildLeadQuery(filters);

    const leads = await LeadModel.find(query)
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 })
      .lean();

    const csvData = generateLeadsCsv(leads as unknown as ILead[]);

    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `leads_export_${dateStr}.csv`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.status(200).send(csvData);
  }
);
