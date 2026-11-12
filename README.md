# AlbumExpress

API sencilla de fotos con Express 5.

## Ejecutar

```bash
npm run dev
```

## Rutas

- `GET /api/fotos`: lista las fotos.
- `GET /api/fotos/:id`: busca una foto.
- `POST /api/fotos`: crea una foto.
- `PATCH /api/fotos/:id`: actualiza solo los campos enviados.
- `DELETE /api/fotos/:id`: elimina una foto y responde `204`.

Los datos se guardan en memoria. Al reiniciar el servidor, las fotos creadas o modificadas desaparecen y vuelve la lista inicial.

## Propuesta para organizar muchas rutas

- `src/server.js`: configura Express, middleware y errores.
- `src/routes/`: define las rutas por recurso, por ejemplo `fotos.routes.js`.
- `src/controllers/`: contiene la lógica de cada ruta.
- `src/data/`: guarda los datos temporalmente; luego se conecta con PostgreSQL.