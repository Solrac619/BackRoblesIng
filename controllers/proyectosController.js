const db = require('../config/bd');

const getAllProyectos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Proyecto');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
};

const getProyectoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Proyecto WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};

const createProyecto = async (req, res) => {
  const { cliente, ubicacion, descripcion, empresa_id } = req.body;
  let fecha_fin = req.body.fecha_fin || null;

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Inserta el proyecto
    const [projectResult] = await connection.query(
      'INSERT INTO Proyecto (cliente, ubicacion, descripcion, fecha_fin, empresa_id) VALUES (?, ?, ?, ?, ?)', 
      [cliente, ubicacion, descripcion, fecha_fin, empresa_id]
    );

    const proyectoId = projectResult.insertId;

    // Inserta un detalle de presupuesto asociado al nuevo proyecto
    const [budgetDetailResult] = await connection.query(
      'INSERT INTO presupuesto_detalles (proyecto_id, material_id, monto_presupuesto, monto_gatoreal) VALUES (?, NULL, 0, 0)', 
      [proyectoId]
    );

    await connection.commit();

    res.status(201).json({ 
      proyecto: { id: proyectoId, cliente, ubicacion, descripcion, fecha_fin, empresa_id },
      presupuestoDetalle: { id: budgetDetailResult.insertId, proyecto_id: proyectoId }
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error al crear el proyecto y el detalle del presupuesto' });
  } finally {
    if (connection) connection.release();
  }
};

const updateProyecto = async (req, res) => {
  const { id } = req.params;
  const { cliente, ubicacion, descripcion, fecha_fin, empresa_id } = req.body;
  try {
    await db.query(
      'UPDATE Proyecto SET cliente = ?, ubicacion = ?, descripcion = ?, fecha_fin = ?, empresa_id = ? WHERE id = ?', 
      [cliente, ubicacion, descripcion, fecha_fin, empresa_id, id]
    );
    res.json({ id, cliente, ubicacion, descripcion, fecha_fin, empresa_id });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
};

const deleteProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Proyecto WHERE id = ?', [id]);
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
};

module.exports = {
  getAllProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto
};
