const db = require('../config/bd'); // Asegúrate de que la ruta sea correcta

const getAllRubro = async (req, res) => {
    try {
        const [rows] = await (await db).query('SELECT * FROM rubro');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los Rubro' });
    }
};

const getrubroById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await (await db).query('SELECT * FROM rubro WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'rubro no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el rubro' });
    }
};

const createrubro = async (req, res) => {
    const { nombre } = req.body;
    try {
        const result = await (await db).query('INSERT INTO rubro (nombre) VALUES (?)', [nombre]);
        res.status(201).json({ id: result.insertId, nombre });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el rubro' });
    }
};

const updaterubro = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        await (await db).query('UPDATE rubro SET nombre = ? WHERE id = ?', [nombre, id]);
        res.json({ id, nombre });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el rubro' });
    }
};

const deleterubro = async (req, res) => {
    const { id } = req.params;
    try {
        await (await db).query('DELETE FROM rubro WHERE id = ?', [id]);
        res.json({ message: 'rubro eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el rubro' });
    }
};

module.exports = {
    getAllRubro,
    getrubroById,
    createrubro,
    updaterubro,
    deleterubro
};
