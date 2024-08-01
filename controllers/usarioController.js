const db = require('../config/bd');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/configsecret');

// Controladores
const getAllUsuarios = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Usuario');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Usuario WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUsuario = async (req, res) => {
    const { nombre, email, departamento, telefono, usuario, contraseña } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10); // Encriptar contraseña
        const result = await db.query('INSERT INTO Usuario (nombre, email, departamento, telefono, usuario, contraseña) VALUES (?, ?, ?, ?, ?, ?)', [nombre, email, departamento, telefono, usuario, hashedPassword]);
        res.status(201).json({ id: result.insertId, nombre, email, departamento, telefono, usuario });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, departamento, telefono, usuario, contraseña } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10); // Encriptar contraseña
        await db.query('UPDATE Usuario SET nombre = ?, email = ?, departamento = ?, telefono = ?, usuario = ?, contraseña = ? WHERE id = ?', [nombre, email, departamento, telefono, usuario, hashedPassword, id]);
        res.json({ message: 'Usuario actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Usuario WHERE id = ?', [id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUsuario = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM Usuario WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }
        const usuario = rows[0];
        const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!validPassword) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }
        const token = jwt.sign({ id: usuario.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario
};
