const db = require('../config/bd'); // Asegúrate de que la ruta sea correcta

const getAllPresupuestos = async (req, res) => {
    try {
        const [rows] = await (await db).query('SELECT * FROM Presupuesto');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los presupuestos' });
    }
};

const getPresupuestoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await (await db).query('SELECT * FROM Presupuesto WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Presupuesto no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el presupuesto' });
    }
};

const createPresupuesto = async (req, res) => {
    const { proyecto_id } = req.body;
    try {
        const result = await (await db).query('INSERT INTO Presupuesto (proyecto_id, fecha_creacion) VALUES (?, NOW())', [proyecto_id]);
        res.status(201).json({ id: result.insertId, proyecto_id, fecha_creacion: new Date() });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el presupuesto' });
    }
};

const updatePresupuesto = async (req, res) => {
    const { id } = req.params;
    const { proyecto_id } = req.body;
    try {
        await (await db).query('UPDATE Presupuesto SET proyecto_id = ? WHERE id = ?', [proyecto_id, id]);
        res.json({ id, proyecto_id });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el presupuesto' });
    }
};

const deletePresupuesto = async (req, res) => {
    const { id } = req.params;
    try {
        await (await db).query('DELETE FROM Presupuesto WHERE id = ?', [id]);
        res.json({ message: 'Presupuesto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el presupuesto' });
    }
};

module.exports = {
    getAllPresupuestos,
    getPresupuestoById,
    createPresupuesto,
    updatePresupuesto,
    deletePresupuesto
};
