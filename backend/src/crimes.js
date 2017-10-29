const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const DEFAULT_LIMIT = 300;
const DEFAULT_DISTANCE = 1000;

router.use(bodyParser.json());

const identity = (obj) => obj;

/*
 * Get all crimes
 *
 * Query Params:
 * - categories: filter by crime category. Format: <categoryA>,<categoryB>,<categoryC>
 * - dateRange: filter by occurrence time. Format: <start date>..<end date>. Dates must use iso 8601 format
 * - latlondist: filter by location. Format: <latitude>,<longitude>,<distance in meters>. Distance defaults to DEFAULT_DISTANCE.
 * - limit: amount of results to return. Defaults to DEFAULT_LIMIT.
 *
 * Example:
 * /crimes?categories=larceny,robbery&dateRange=2016-12-31T20:00-07..2017-01-01T10:00-07&latlondist=39.7281673,-104.9729902,9000&limit=2
 */
router.get('/', async (req, res, next) => {
  try {
    const q = req.query || {};
    const constraints = [];

    // categories
    const categories = (q.categories || '').split(',').filter(identity);
    if (categories.length) {
      constraints.push('offense_category_id = ANY(${categories})');
    }

    // dateRange
    const [ start, end ] = (q.dateRange || '').split('..').filter(identity);
    if (start && end) {
      constraints.push('reported_date BETWEEN ${start} AND ${end}')
    }

    // location
    const [ lat, lon, distance = DEFAULT_DISTANCE ] = (
      (q.latlondist || '').split(',').filter(identity)
    );
    if (lat && lon && distance) {
      constraints.push(`
        earth_box(
          ll_to_earth(\${lat}, \${lon}),
          \${distance}
        ) @> ll_to_earth(crimes.geo_lat, crimes.geo_lon)
        AND earth_distance(
          ll_to_earth(crimes.geo_lat, crimes.geo_lon),
          ll_to_earth(\${lat}, \${lon})
        ) < \${distance}
      `)
    }

    // limit
    const limit = q.limit || DEFAULT_LIMIT;

    const query = constraints.length ? constraints.join(' AND ') : 'true';
    const result = await req.app.get('db').crimes.where(
      query,
      { categories, start, end, lat, lon, distance },
      { limit }
    );
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
