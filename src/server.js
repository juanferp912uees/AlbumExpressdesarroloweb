import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000;

// "Base de datos" en memoria (por ahora)
const fotos = [
  {
    id: 1,
    titulo: 'Atardecer',
    calificacion: 4.5,
    descripcion: 'Playa de Montañita'
  },
  {
    id: 2,
    titulo: 'Malecón',
    calificacion: 4.0,
    descripcion: 'Guayaquil de noche'
  }
];

// Middleware: convierte el cuerpo JSON en req.body
app.use(express.json());

// Middleware propio: registra cada petición
app.use((req, res, next) => {
  const hora = new Date().toISOString();
  console.log(`${hora} ${req.method} ${req.url}`);
  next();
});

app.get('/api/fotos', (req, res) => {
  res.json(fotos);
});

app.get('/api/fotos/:id', (req, res) => {
  const id = Number(req.params.id);
  const foto = fotos.find((f) => f.id === id);

  if (!foto) {
    return res
      .status(404)
      .json({ mensaje: `Foto ${id} no encontrada` });
  }

  res.json(foto);
});

app.post('/api/fotos', (req, res) => {
  const { titulo, descripcion, calificacion } = req.body;

  if (!titulo) {
    return res
      .status(400)
      .json({ mensaje: 'El título es obligatorio' });
  }

  const nueva = {
    id: fotos.length + 1,
    titulo,
    descripcion,
    calificacion
  };

  fotos.push(nueva);
  res.status(201).json(nueva);
});

// En Express 5, los errores de funciones async llegan al middleware de errores.
app.get('/api/error', async () => {
  throw new Error('Algo salió mal');
});

// Middleware de errores: debe ir después de las rutas.
app.use((err, req, res, next) => {
  console.error(err.message);
  res
    .status(500)
    .json({ mensaje: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
