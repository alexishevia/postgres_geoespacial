## Parte 1 - Configuración Inicial
Si antes del taller descargaste todos los archivos y configuraste el proyecto
correctamente, puedes omitir esta sección.

Si aún no has configurado el proyecto, sigue los siguientes pasos:

1. Tienes 2 opciones para descargar los archivos:
    - Descargar los archivos que estaremos pasando por USB
    - Descargar los archivos desde el servidor web que está corriendo en `http://192.x.x.x`

2. Edita el archivo `docker-compose.yml`. Borra las siguientes líneas:
  ```
  tiles:
    image: klokantech/openmaptiles-server
    volumes:
      - ./tiles:/data
    ports:
      - 3002:80
  ```

3. Edita el archivo `frontend/src/components/Map/component.js` para usar OpenStreetMap en vez `localhost:3002`.
  ```
  const mapURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // OpenStreetMap
  // const mapURL = 'http://localhost:3002/styles/osm-bright/{z}/{x}/{y}.png'; // Local Tiles Server
  ```

4. Carga las imágenes de docker (para no tener que descargarlas de internet):
  ```
  docker load -i ~/Downloads/node:8.6.0-alpine
  docker load -i ~/Downloads/postgres:9.6.5-alpine
  ```

5. Arranca los contenedores de docker:
  ```
  docker-compose up
  ```

  Los siguientes servicios deben estar funcionando:
  - Frontend: http://localhost:3000/  
    Debe mostrar un mensaje de "Error al cargar paradas".
  - Backend: http://localhost:3001/  
    Debe mostrar un mensaje de "Backend is Working!"
  - Postgres: `docker-compose exec postgres psql postgres://geoapp@postgres/geoapp`  
    Debe permitir la conexión a psql.
