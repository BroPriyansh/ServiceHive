import express from 'express';

import {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from '../controllers/lead.controller';

import { protect } from '../middleware/auth.middleware';

import { leadValidator } from '../validators/lead.validator';

import { validate } from '../middleware/validate.middleware';

const router = express.Router();

router.post(
  '/',
  protect,
  leadValidator,
  validate,
  createLead
);

router.get('/', protect, getLeads);

router.get(
  '/export/csv',
  protect,
  exportLeadsCSV
);

router.get('/:id', protect, getSingleLead);

router.put(
  '/:id',
  protect,
  leadValidator,
  validate,
  updateLead
);

router.delete('/:id', protect, deleteLead);

export default router;