## Bonus - Denver Crimes
El tiempo restante lo utilizaremos para crear un API para consultar las
ocurrencias de crímenes en Denver.

1. Copia el archivo [crimes.csv](https://www.denvergov.org/media/gis/DataCatalog/crime/csv/crime.csv) a la carpeta `sampleData`.

2. Crea la tabla "crimes"
  ``` sh
  docker-compose exec backend npm run db:createMigration -- add-table-crimes --sql-file
  sudo chown -R $USER:$USER backend/migrations
  ```

  ```
  # backend/migrations/sqls/<timestamp>-add-table-crimes-up.sql
  CREATE TABLE crimes (
    ID SERIAL NOT NULL PRIMARY KEY,
    INCIDENT_ID BIGINT,
    OFFENSE_ID BIGINT,
    OFFENSE_CODE INTEGER,
    OFFENSE_CODE_EXTENSION INTEGER,
    OFFENSE_TYPE_ID TEXT,
    OFFENSE_CATEGORY_ID TEXT,
    FIRST_OCCURRENCE_DATE TIMESTAMPTZ,
    LAST_OCCURRENCE_DATE TIMESTAMPTZ,
    REPORTED_DATE TIMESTAMPTZ,
    INCIDENT_ADDRESS TEXT,
    GEO_X BIGINT,
    GEO_Y BIGINT,
    GEO_LON DOUBLE PRECISION,
    GEO_LAT DOUBLE PRECISION,
    DISTRICT_ID INTEGER,
    PRECINCT_ID INTEGER,
    NEIGHBORHOOD_ID TEXT,
    IS_CRIME SMALLINT,
    IS_TRAFFIC SMALLINT
  );
  ```

  ```
  # backend/migrations/sqls/<timestamp>-add-table-crimes-up.sql
  DROP TABLE crimes;
  ```

  ``` sh
  docker-compose exec backend npm run db:migrate
  ```

3. Carga datos de ejemplo a la tabla
  ``` sh
  docker-compose exec postgres psql postgres://geoapp@postgres/geoapp

  COPY crimes (
    INCIDENT_ID,
    OFFENSE_ID,
    OFFENSE_CODE,
    OFFENSE_CODE_EXTENSION,
    OFFENSE_TYPE_ID,
    OFFENSE_CATEGORY_ID,
    FIRST_OCCURRENCE_DATE,
    LAST_OCCURRENCE_DATE,
    REPORTED_DATE,
    INCIDENT_ADDRESS,
    GEO_X,
    GEO_Y,
    GEO_LON,
    GEO_LAT,
    DISTRICT_ID,
    PRECINCT_ID,
    NEIGHBORHOOD_ID,
    IS_CRIME,
    IS_TRAFFIC
  )
  FROM '/sampleData/crime.csv'
  WITH (
    FORMAT CSV,
    HEADER true,
    FORCE_NULL (
      INCIDENT_ID,
      OFFENSE_ID,
      OFFENSE_CODE,
      OFFENSE_CODE_EXTENSION,
      OFFENSE_TYPE_ID,
      OFFENSE_CATEGORY_ID,
      FIRST_OCCURRENCE_DATE,
      LAST_OCCURRENCE_DATE,
      REPORTED_DATE,
      INCIDENT_ADDRESS,
      GEO_X,
      GEO_Y,
      GEO_LON,
      GEO_LAT,
      DISTRICT_ID,
      PRECINCT_ID,
      NEIGHBORHOOD_ID,
      IS_CRIME,
      IS_TRAFFIC
    )
  );
  ```

4. Desarrolla un API que nos permita interactuar con la data de la tabla "crimes"

  Query Params:
  - categories: filter by crime category. Format: `<categoryA>,<categoryB>,<categoryC>`
  - dateRange: filter by occurrence time. Format: `<start date>..<end date>`. Dates must use iso 8601 format
  - latlondist: filter by location. Format: `<latitude>,<longitude>,<distance in meters>`. Distance defaults to `DEFAULT_DISTANCE`.
  - limit: amount of results to return. Defaults to `DEFAULT_LIMIT`.

  Ejemplo:
  ```
  /crimes?categories=larceny,robbery&dateRange=2016-12-31T20:00-07..2017-01-01T10:00-07&latlondist=39.7281673,-104.9729902,9000&limit=2
  ```
