const db = require('../config/bd');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../assets/'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Middleware de multer para manejar la subida del archivo
const upload = multer({ storage: storage });

// Middleware para subir el archivo
exports.upload = upload.single('formato');

// Función para manejar la subida del archivo y la inserción en la base de datos
exports.uploadFile = async (req, res) => {
  try {
    const tipo = req.file.mimetype;
    const nombre = req.file.filename; // Usar el filename generado por multer

    const queryString = 'INSERT INTO formatos (nombre, tipo) VALUES (?, ?)';
    const values = [nombre, tipo];

    const [result] = await db.query(queryString, values);

    console.log('Formato agregado');
    res.json({ id: result.insertId });
  } catch (err) {
    console.error('Error al insertar en la base de datos:', err);
    res.status(500).json({ error: 'Error al cargar el formato' });
  }
};

// Función para listar los archivos en el directorio assets
exports.listFiles = async (req, res) => {
    try {
      const files = fs.readdirSync(path.join(__dirname, '../assets/'));
      res.json({ files }); // Devuelve un objeto con la clave files que es un array
    } catch (err) {
      console.error('Error al listar archivos:', err);
      res.status(500).json({ error: 'Error al listar archivos' });
    }
  };