const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const DEFAULT_LIMIT = 300;

router.use(bodyParser.json());

/*
 * Get all stops.
 *
 * Query Params:
 * - q: text search
 */
router.get('/', async (req, res, next) => {
  try {
    const { q } = req.query;
    const table = req.app.get('db').stops;
    let query = 'true';
    if (q && q.length) {
      query = "to_tsvector('spanish', description) @@ plainto_tsquery('spanish', ${q})";
    }
    const result = await table.where(query, { q }, { limit: DEFAULT_LIMIT });
    res.json(result);
  } catch (err) { next(err); }
});

/*
 * Create a stop.
 *
 * JSON Body:
 *  - latitude <Decimal>
 *  - longitude <Decimal>
 *  - description <String>
 */
router.post('/', async (req, res, next) => {
  try {
    const table = req.app.get('db').stops;
    const result = await table.insert(req.body);
    res.json(result);
  } catch (err) { next(err); }
});

/*
 * Update a stop.
 *
 * JSON Body:
 *  - latitude <Decimal>
 *  - longitude <Decimal>
 *  - description <String>
 */
router.put('/:id', async (req, res, next) => {
  try {
    const table = req.app.get('db').stops;
    const result = await table.update({
      ...req.body,
      id: req.params.id
    });
    res.json(result);
  } catch (err) { next(err); }
});

/*
 * Delete a stop.
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const table = req.app.get('db').stops;
    const id = parseInt(req.params.id, 10);
    const result = await table.destroy(id);
    res.json(result);
  } catch (err) { next(err); }
});

module.exports = router;
