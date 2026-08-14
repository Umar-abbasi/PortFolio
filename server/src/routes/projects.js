import { Router } from 'express';
import { body, param } from 'express-validator';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate, slugify } from '../middleware/validate.js';

const router = Router();

function toDto(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    status: row.status,
    client: row.client,
    duration: row.duration,
    desc: row.description,
    features: row.features,
    results: row.results,
    tags: row.tags,
    github: row.github_url,
    live: row.live_url,
  };
}

router.get('/', async (req, res) => {
  const { rows } = await query('SELECT * FROM projects ORDER BY created_at DESC');
  res.json(rows.map(toDto));
});

router.get('/:slug', param('slug').isString(), validate, async (req, res) => {
  const { rows } = await query('SELECT * FROM projects WHERE slug = $1', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(toDto(rows[0]));
});

const projectValidators = [
  body('title').isString().trim().isLength({ min: 2, max: 160 }),
  body('category').isString().trim().isLength({ min: 2, max: 60 }),
  body('status').isIn(['live', 'progress', 'draft']),
  body('client').optional({ nullable: true }).isString().trim().isLength({ max: 160 }),
  body('duration').optional({ nullable: true }).isString().trim().isLength({ max: 60 }),
  body('desc').optional({ nullable: true }).isString().trim().isLength({ max: 4000 }),
  body('features').optional().isArray(),
  body('results').optional().isArray(),
  body('tags').optional().isArray(),
  body('github').optional({ nullable: true }).isURL().withMessage('github must be a valid URL'),
  body('live').optional({ nullable: true, checkFalsy: true }).isURL().withMessage('live must be a valid URL'),
];

router.post('/', requireAdmin, projectValidators, validate, async (req, res) => {
  const b = req.body;
  const slug = slugify(b.title);
  const { rows } = await query(
    `INSERT INTO projects (slug,title,category,status,client,duration,description,features,results,tags,github_url,live_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [
      slug,
      b.title,
      b.category,
      b.status,
      b.client || null,
      b.duration || null,
      b.desc || null,
      JSON.stringify(b.features || []),
      JSON.stringify(b.results || []),
      JSON.stringify(b.tags || []),
      b.github || null,
      b.live || null,
    ]
  );
  res.status(201).json(toDto(rows[0]));
});

router.put(
  '/:id',
  requireAdmin,
  [param('id').isInt(), ...projectValidators],
  validate,
  async (req, res) => {
    const b = req.body;
    const { rows } = await query(
      `UPDATE projects SET title=$1,category=$2,status=$3,client=$4,duration=$5,description=$6,
       features=$7,results=$8,tags=$9,github_url=$10,live_url=$11,updated_at=now()
       WHERE id=$12 RETURNING *`,
      [
        b.title,
        b.category,
        b.status,
        b.client || null,
        b.duration || null,
        b.desc || null,
        JSON.stringify(b.features || []),
        JSON.stringify(b.results || []),
        JSON.stringify(b.tags || []),
        b.github || null,
        b.live || null,
        req.params.id,
      ]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(toDto(rows[0]));
  }
);

router.delete('/:id', requireAdmin, param('id').isInt(), validate, async (req, res) => {
  const { rowCount } = await query('DELETE FROM projects WHERE id=$1', [req.params.id]);
  if (!rowCount) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

export default router;
