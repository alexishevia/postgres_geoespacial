## Parte 2 - CRUD paradas

En Panamá existen paradas de autobús con internet gratuito, llamadas "Paradas
SmartCity".

En los próximos 15 minutos vamos a crear una aplicación que nos permita guardar
la ubicación de estas paradas.

1. Crear una tabla para nuestras paradas SmartCity. Vamos a utilizar una
  migración para esto:
  ```
  docker-compose exec backend npm run db:createMigration -- add-table-stops --sql-file
  sudo chown -R $USER:$USER backend/migrations
  ```

2. Up migration
  ```
  # backend/migrations/sqls/<timestamp>-add-table-stops-up.sql
  CREATE TABLE stops (
    id SERIAL NOT NULL PRIMARY KEY,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    description text
  );
  ```

3. Down migration
  ```
  # backend/migrations/sqls/<timestamp>-add-table-stops-down.sql
  DROP TABLE stops;
  ```

4. Corremos nuestras migraciones:
  ```
  docker-compose exec backend npm run db:migrate
  ```

  Siempre es bueno probar que podemos rollback:
  ```
  docker-compose exec backend npm run db:rollback
  ```

  Para asegurarnos que las tablas se crearon correctamente:
  ```
  # conectarse a postgres
  docker-compose exec postgres psql postgres://geoapp@postgres/geoapp

  # mostar tablas
  \d

  # mostrar descripción de la tabla stops
  \d stops
  ```

5. Crear la conexión a Massive.JS
  ```
  // backend/src/app.js
  const massive = require('massive');

  // connect massive.js
  app.use((req, res, next) => {
    if (app.get('db')) return next();
    massive({ connectionString : process.env.DATABASE_URL })
    .then(instance => app.set('db', instance))
    .then(() => next())
    .catch(err => next(err));
  });
  ```

6. Endpoint para listar todas las paradas
  ```
  // backend/src/stops.js
  const express = require('express');
  const router = express.Router();

  const DEFAULT_LIMIT = 300;

  /*
   * Get all stops.
   */
  router.get('/', async (req, res, next) => {
    try {
      const table = req.app.get('db').stops;
      const result = await table.find({}, { limit: DEFAULT_LIMIT });
      res.json(result);
    } catch (err) { next(err); }
  });

  module.exports = router;
  ```

  ``` backend/src/app.js
  app.use('/stops', require('./stops'));
  ```

7. Endpoint para crear paradas
  ```
  // backend/src/stops.js
  const bodyParser = require('body-parser');
  router.use(bodyParser.json());

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
  ```

8. Endpoint para actualizar paradas
  ```
  // backend/src/stops.js
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
  ```

9. Endpoint para borrar paradas
  ```
  // backend/src/stops.js
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
  ```
