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
 * - latlondist: filter by location. Format: <latitude>,<longitude>,<distance in meters>.
 *   Distance defaults to DEFAULT_DISTANCE.
 */
router.get('/', async (req, res, next) => {
  try {
    const { q = '', latlondist = '' } = req.query;
    const [ lat, lon, distance ] = latlondist.split(',').filter(obj => !!obj);
    const table = req.app.get('db').stops;
    const queries = [];

    // full-text search
    if (q) {
      queries.push(`
        to_tsvector(\${lang}, description) @@ plainto_tsquery(\${lang}, \${q})
      `)
    }

    // location
    if (lat && lon && distance) {
      queries.push(`
        earth_box(
          ll_to_earth(\${lat}, \${lon}),
          \${distance}
        ) @> ll_to_earth(latitude, longitude)
        AND earth_distance(
          ll_to_earth(latitude, longitude),
          ll_to_earth(\${lat}, \${lon})
        ) < \${distance}
      `)
    }

    const query = queries.length ? queries.join(' AND ') : 'true';
    const result = await table.where(
      query, { lang: 'spanish', q, lat, lon, distance },
      { limit: DEFAULT_LIMIT, build: false}
    );
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
