### Parte 3 (15 minutos) - Full-text search
Permitir la búsqueda de lugares mediante texto.

1. Cargar datos de ejemplo:
  ```
  # conectarse a psql
  docker-compose exec postgres psql postgres://geoapp@postgres/geoapp

  # eliminar datos anteriores
  DELETE FROM stops WHERE true;

  # cargar datos de ejemplo
  COPY stops (
    longitude,
    latitude,
    id,
    description
  )
  FROM '/sampleData/Paradas_SmartCity.csv'
  WITH (
    FORMAT CSV,
    HEADER true
  );

  # actualizar sequence para evitar conflictos
  SELECT setval('stops_id_seq', (SELECT MAX(id) FROM stops), true);
  ```

2. Agregar full text search en `GET /stops` endpoint
  ```
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
  ```

  PostgreSQL tiene un sistema de full-text search muy flexible.

  Ejemplos:
  - Búsqueda utilizando operadores booleanos
  ```
  SELECT * FROM stops
  WHERE to_tsvector('spanish', description) @@ to_tsquery('spanish', 'par:*');

  SELECT * FROM stops
  WHERE to_tsvector('spanish', description) @@ to_tsquery('spanish', 'plaza & calle');

  SELECT * FROM stops
  WHERE to_tsvector('spanish', description) @@ to_tsquery('spanish', 'plaza | calle');
  ```

  - Búsquedas en múltiples campos, asignando prioridad a cada campo.
  ```
     SELECT id,
            description,
            ts_rank(
              setweight(to_tsvector('spanish', id::text), 'A') ||
              setweight(to_tsvector('spanish', description), 'B'),
              to_tsquery('spanish', 'plaza | calle | hospital | avenida')
            ) AS rank
       FROM stops
   ORDER BY rank DESC
      LIMIT 10;
  ```
