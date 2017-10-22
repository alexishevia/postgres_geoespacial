### Parte 4 - Búsquedas geográficas
Utilizar la ubicación geográfica del usuario para filtar resultados.

1. Agregar la extensión [earthdistance](https://www.postgresql.org/docs/current/static/earthdistance.html):
  ``` sh
  docker-compose exec backend npm run db:createMigration -- add-extension-earthdistance --sql-file
  sudo chown -R $USER:$USER backend/migrations
  ```

  ```
  # backend/migrations/sqls/<timestamp>-add-extension-earthdistance-up.sql
  CREATE EXTENSION cube;
  CREATE EXTENSION earthdistance;
  ```

  ```
  # backend/migrations/sqls/<timestamp>-add-extension-earthdistance-down.sql
  DROP EXTENSION earthdistance;
  DROP EXTENSION cube;
  ```

  ``` sh
  docker-compose exec backend npm run db:migrate
  ```

2. Actualizar `GET /stops` para que acepte coordenadas geográficas
  ```
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
      const { q, latlondist = '' } = req.query;
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
  ```

3. Agregar índice geoespacial
  ``` sh
  docker-compose exec postgres psql postgres://geoapp@postgres/geoapp

  EXPLAIN SELECT id FROM stops
  WHERE earth_box(ll_to_earth(8.9, -79.5), 1000) @> ll_to_earth(latitude, longitude);
  ```

  ``` sh
  docker-compose exec backend npm run db:createMigration -- add-index-stops-latlon --sql-file
  sudo chown -R $USER:$USER backend/migrations
  ```

  ```
  # backend/migrations/sqls/<timestamp>-add-index-stops-latlon-up.sql
  CREATE INDEX stops_latlon_index ON stops
  USING gist (ll_to_earth(latitude, longitude));
  ```

  ```
  # backend/migrations/sqls/<timestamp>-add-index-stops-latlon-down.sql
  DROP INDEX stops_latlon_index;
  ```

  ``` sh
  docker-compose exec backend npm run db:migrate
  ```
