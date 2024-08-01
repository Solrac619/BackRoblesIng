const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const loginRoutes = require('./routes/login');
const proyectoRoutes = require('./routes/proyectos');
const proveedorRoutes = require('./routes/proveedores');
const presupuestoRoutes = require('./routes/presupuesto');
const materialRoutes = require('./routes/material');
const usuarioRoutes = require('./routes/usuarios');
const DetalleP = require('./routes/presupuesto_detalles');
const formatoRoutes = require('./routes/formatos');
const graficosRoutes = require('./routes/graficos');
const rubroRoutes = require('./routes/rubro');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/login', loginRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/proveedores', proveedorRoutes);
app.use('/presupuestos', presupuestoRoutes);
app.use('/material', materialRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/detallesp', DetalleP);
app.use('/formato', formatoRoutes);
app.use('/graficos', graficosRoutes);
app.use('/rubro', rubroRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
