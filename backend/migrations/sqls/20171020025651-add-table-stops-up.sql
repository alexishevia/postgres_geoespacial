CREATE TABLE stops (
  id SERIAL NOT NULL PRIMARY KEY,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  description text,

  UNIQUE(latitude, longitude)
);
