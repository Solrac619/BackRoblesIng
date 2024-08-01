const db = require('../config/bd');

const getTotales = async (req, res) => {
  const proyectoId = req.params.proyectoId;

  try {
    const [result] = await (await db).query(`
      SELECT 
        SUM(CASE WHEN dp.monto_presupuesto > dp.monto_gatoreal THEN dp.monto_presupuesto - dp.monto_gatoreal ELSE 0 END) AS total_ganancias_brutas,
        SUM(CASE WHEN dp.monto_presupuesto < dp.monto_gatoreal THEN dp.monto_gatoreal - dp.monto_presupuesto ELSE 0 END) AS total_perdidas,
        SUM(dp.monto_gatoreal) AS total_gastos,
        (SUM(CASE WHEN dp.monto_presupuesto > dp.monto_gatoreal THEN dp.monto_presupuesto - dp.monto_gatoreal ELSE 0 END) -
         SUM(CASE WHEN dp.monto_presupuesto < dp.monto_gatoreal THEN dp.monto_gatoreal - dp.monto_presupuesto ELSE 0 END)) AS total_ganancias_netas
      FROM 
        presupuesto_detalles dp
      WHERE 
        dp.proyecto_id = ?;
    `, [proyectoId]);

    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener los totales:', error);
    res.status(500).json({ error: 'Error al obtener los totales' });
  }
};

  

const getTotalesTodosProyectos = async (req, res) => {
  const { fecha_inicio } = req.params; // Obteniendo el mes y año de los parámetros
  try {
    const [result] = await (await db).query(`
      SELECT 
  SUM(CASE WHEN dp.monto_presupuesto > dp.monto_gatoreal THEN dp.monto_presupuesto - dp.monto_gatoreal ELSE 0 END) AS total_ganancias_brutas,
  SUM(CASE WHEN dp.monto_presupuesto < dp.monto_gatoreal THEN dp.monto_gatoreal - dp.monto_presupuesto ELSE 0 END) AS total_perdidas,
  SUM(dp.monto_gatoreal) AS total_gastos,
  (SUM(CASE WHEN dp.monto_presupuesto > dp.monto_gatoreal THEN dp.monto_presupuesto - dp.monto_gatoreal ELSE 0 END) -
  SUM(CASE WHEN dp.monto_presupuesto < dp.monto_gatoreal THEN dp.monto_gatoreal - dp.monto_presupuesto ELSE 0 END)) AS total_ganancias_netas
FROM 
  presupuesto_detalles dp
JOIN 
  proyecto p ON dp.proyecto_id = p.id
WHERE 
  p.fecha_inicio > ?

    `, [fecha_inicio]);

    console.log('Datos obtenidos:', result || []); // Agrega esto para verificar los datos
    console.log('Oaaa')
    res.json(result);
    
  } catch (error) {
    console.error('Error al obtener los totales de todos los proyectos:', error);
    res.status(500).json({ error: 'Error al obtener los totales de todos los proyectos' });
  }
};



  


  module.exports = {
    getTotales,
    getTotalesTodosProyectos,
  };