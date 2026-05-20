import { Router } from 'express';
import {
  getLeads,
  createLead,
  getLeadById,
  updateLead,
  deleteLead,
  exportLeadsCsv,
} from '../controllers/lead.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router: Router = Router();

// All routes require authentication
router.use(authMiddleware);

// Export CSV — must be before /:id to avoid conflicts
router.get('/export/csv', requireRole('admin'), exportLeadsCsv);

router.get('/', getLeads);
router.post('/', requireRole('admin'), createLead);
router.get('/:id', getLeadById);
router.put('/:id', requireRole('admin'), updateLead);
router.delete('/:id', requireRole('admin'), deleteLead);

export default router;
