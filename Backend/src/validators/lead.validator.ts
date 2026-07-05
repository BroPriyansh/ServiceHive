import { body } from 'express-validator';

export const leadValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email required'),

  body('status')
    .isIn([
      'New',
      'Contacted',
      'Qualified',
      'Lost',
    ])
    .withMessage('Invalid status'),

  body('source')
    .isIn([
      'Website',
      'Instagram',
      'Referral',
    ])
    .withMessage('Invalid source'),
];