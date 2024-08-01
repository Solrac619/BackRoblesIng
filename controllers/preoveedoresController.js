const db = require('../config/bd');

const getAllProveedores = async (req, res) => {
    try {
        const [rows] = await (await db).query('SELECT * FROM Proveedor');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProveedorById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await (await db).query('SELECT * FROM Proveedor WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createProveedor = async (req, res) => {
    const { nombre, codigo, rfc, direccion, ciudad, nombreContacto, email, telefono } = req.body;
    try {
        const [result] = await (await db).query('INSERT INTO Proveedor (nombre, codigo, rfc, direccion, ciudad, nombreContacto, email, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nombre, codigo, rfc, direccion, ciudad, nombreContacto, email, telefono]);
        res.json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProveedor = async (req, res) => {
    const { id } = req.params;
    const { nombre, codigo, rfc, direccion, ciudad, nombreContacto, email, telefono } = req.body;
    try {
        await (await db).query('UPDATE Proveedor SET nombre = ?, codigo = ?, rfc = ?, direccion = ?, ciudad = ?, nombreContacto = ?, email = ?, telefono = ? WHERE id = ?', [nombre, codigo, rfc, direccion, ciudad, nombreContacto, email, telefono, id]);
        res.json({ message: 'Proveedor actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProveedor = async (req, res) => {
    const { id } = req.params;
    try {
        await (await db).query('DELETE FROM Proveedor WHERE id = ?', [id]);
        res.json({ message: 'Proveedor eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports ={
    getAllProveedores,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor

};