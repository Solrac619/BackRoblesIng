const db = require('../config/bd'); // Asegúrate de que la ruta sea correcta

const getAllMateriales = async (req, res) => {
    try {
        const [rows] = await (await db).query('SELECT * FROM material');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los materiales' });
    }
};

const getMaterialById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await (await db).query('SELECT * FROM material WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Material no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el material' });
    }
};

const getMaterialesGroupedByRubro = async (req, res) => {
    try {
        const [rows] = await (await db).query(`
            SELECT rubro.nombre as rubro, material.nombre as material, material.id as material_id 
            FROM material
            JOIN rubro ON material.rubro_id = rubro.id
            ORDER BY rubro.nombre, material.nombre
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los materiales agrupados por rubro' });
    }
};




const createMaterial = async (req, res) => {
    const { nombre, rubro_id } = req.body;
    try {
        const result = await (await db).query('INSERT INTO material (nombre, rubro_id) VALUES (?, ?)', [nombre, rubro_id]);
        res.status(201).json({ id: result.insertId, nombre, rubro_id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el material' });
    }
};

const updateMaterial = async (req, res) => {
    const { id } = req.params;
    const { nombre, rubro_id } = req.body;
    try {
        await (await db).query('UPDATE material SET nombre = ?, rubro_id = ? WHERE id = ?', [nombre, rubro_id, id]);
        res.json({ id, nombre, rubro_id });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
};

const deleteMaterial = async (req, res) => {
    const { id } = req.params;
    try {
        await (await db).query('DELETE FROM material WHERE id = ?', [id]);
        res.json({ message: 'Material eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el material' });
    }
};

module.exports = {
    getAllMateriales,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterialesGroupedByRubro
};
