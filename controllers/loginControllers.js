const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/bd');
const { secretKey } = require('../config/configsecret');

const loginUsuario = async (req, res) => {
    const { email, contraseña } = req.body;
  
    try {
      console.log('Datos recibidos:', { email, contraseña }); // Log para ver los datos recibidos
      const [rows] = await (await db).query('SELECT * FROM Usuario WHERE email = ?', [email]);
      const user = rows[0];
  
      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
      }
  
      console.log('Usuario encontrado:', user);
  
      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        console.log('Contraseña incorrecta');
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
      }
  
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  
  module.exports = {
    loginUsuario,
  };
  