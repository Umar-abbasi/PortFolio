import { Router } from 'express';
import { body, param } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { sendContactNotification } from '../mailer.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' },
});

router.post(
  '/',
  contactLimiter,
  [
    body('name').isString().trim().isLength({ min: 2, max: 120 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('subject').optional({ nullable: true, checkFalsy: true }).isString().trim().isLength({ max: 200 }).escape(),
    body('message').isString().trim().isLength({ min: 10, max: 5000 }).escape(),
  ],
  validate,
  async (req, res) => {
    const { name, email, subject, message } = req.body;
    await query(
      'INSERT INTO contact_messages (name,email,subject,message) VALUES ($1,$2,$3,$4)',
      [name, email, subject || null, message]
    );
    res.status(201).json({ ok: true });
    sendContactNotification({ name, email, subject, message });
  }
);

router.get('/', requireAdmin, async (req, res) => {
  const { rows } = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
  res.json(rows);
});

router.patch('/:id/read', requireAdmin, param('id').isInt(), validate, async (req, res) => {
  const { rows } = await query(
    'UPDATE contact_messages SET read = true WHERE id = $1 RETURNING *',
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

export default router;
