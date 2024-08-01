const db = require('../config/bd'); // Asegúrate de que la ruta sea correcta

const getPresupuestoDetalles = async (req, res) => {
    const { proyectoId } = req.params;

    try {
        const [detalles] = await (await db).query(`
            SELECT dp.id, dp.material_id, dp.monto_presupuesto, dp.monto_gatoreal, m.nombre AS material_nombre
            FROM presupuesto_detalles dp
            JOIN material m ON dp.material_id = m.id
            WHERE dp.proyecto_id = ?`, [proyectoId]); // Cambiado a proyecto_id

        res.json(detalles);
    } catch (error) {
        console.error('Error al obtener los detalles del presupuesto:', error);
        res.status(500).json({ error: 'Error al obtener los detalles del presupuesto' });
    }
};


const getPresupuestoDetalleById = async (req, res) => {
    const proyectoId = req.params.proyectoId;
    console.log('proyectoId:', proyectoId);

  
    try {
      // Modificación de la consulta SQL para incluir la diferencia
      const query = `
      SELECT 
        dp.id, 
        dp.material_id, 
        m.nombre AS material_nombre, 
        dp.monto_presupuesto, 
        dp.monto_gatoreal, 
        (dp.monto_presupuesto - dp.monto_gatoreal) AS diferencia
      FROM 
        presupuesto_detalles dp
      JOIN 
        material m ON dp.material_id = m.id
      WHERE 
        dp.proyecto_id = ?;
    `;

    const [rows] = await (await db).query(query, [proyectoId]);


    res.json(rows || []);
    console.log('Query:', query);
console.log('Rows:', rows);

} catch (error) {
  console.error('Error al obtener los detalles del presupuesto:', error);
  

  res.status(500).json({ error: 'Error al obtener los detalles del presupuesto' });
}
};

const createPresupuestoDetalle = async (req, res) => {
    const { proyecto_id, material_id, monto_presupuesto, monto_gatoreal } = req.body;

    if (!proyecto_id || !material_id || !monto_presupuesto || !monto_gatoreal) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const [result] = await (await db).query(
            'INSERT INTO presupuesto_detalles (proyecto_id, material_id, monto_presupuesto, monto_gatoreal) VALUES (?, ?, ?, ?)',
            [proyecto_id, material_id, monto_presupuesto, monto_gatoreal]
        );
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al agregar el detalle del presupuesto:', error);
        res.status(500).json({ error: 'Error al agregar el detalle del presupuesto.' });
    }
};

const updatePresupuestoDetalle = async (req, res) => {
    const detalleId = req.params.id;
    const { material_id, monto_presupuesto, monto_gatoreal } = req.body;

    try {
        const query = `
            UPDATE presupuesto_detalles
            SET material_id = ?, monto_presupuesto = ?, monto_gatoreal = ?
            WHERE id = ?;
        `;

        const [result] = await (await db).query(query, [material_id, monto_presupuesto, monto_gatoreal, detalleId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Detalle no encontrado' });
        }

        res.status(200).json({ message: 'Detalle actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el detalle del presupuesto:', error);
        res.status(500).json({ error: 'Error al actualizar el detalle del presupuesto' });
    }
};

module.exports = {
    updatePresupuestoDetalle,
};


const deletePresupuestoDetalle = async (req, res) => {
    const { id } = req.params;
    try {
        await (await db).query('DELETE FROM presupuesto_detalles WHERE id = ?', [id]);
        res.json({ message: 'Detalle del presupuesto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el detalle del presupuesto' });
    }
};

module.exports = {
    getPresupuestoDetalles,
    getPresupuestoDetalleById,
    createPresupuestoDetalle,
    updatePresupuestoDetalle,
    deletePresupuestoDetalle,
};
