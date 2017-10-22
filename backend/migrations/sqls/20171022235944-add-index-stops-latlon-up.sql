CREATE INDEX stops_latlon_index ON stops
USING gist (ll_to_earth(latitude, longitude));
