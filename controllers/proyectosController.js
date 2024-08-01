const db = require('../config/bd');

    const getAllProyectos = async (req, res) => {
    try {
        const [rows] = await (await db).query('SELECT * FROM proyecto');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
    };

    const getProyectoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await (await db).query('SELECT * FROM Proyecto WHERE id = ?', [id]);
        if (rows.length === 0) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el proyecto' });
    }
    };

    const createProyecto = async (req, res) => {
      const { cliente, ubicacion, descripcion, fecha_inicio, fecha_fin, empresa_id } = req.body;
  
      try {
          const connection = await db;
          await connection.beginTransaction();
  
          // Inserta el proyecto
          const [projectResult] = await connection.query(
              'INSERT INTO Proyecto (cliente, ubicacion, descripcion, fecha_inicio, fecha_fin, empresa_id) VALUES (?, ?, ?, ?, ?, ?)', 
              [cliente, ubicacion, descripcion, fecha_inicio, fecha_fin, empresa_id]
          );
  
          const proyectoId = projectResult.insertId;
  
          // Inserta un detalle de presupuesto asociado al nuevo proyecto
          // Asumimos que no tienes valores de material_id, monto_presupuesto, y monto_gatoreal en la solicitud
          // Por lo tanto, estos valores se deben agregar después de la creación del proyecto.
          // Aquí estamos insertando un detalle vacío o un detalle inicial, dependiendo de tu flujo de trabajo.
          const [budgetDetailResult] = await connection.query(
              'INSERT INTO presupuesto_detalles (proyecto_id, material_id, monto_presupuesto, monto_gatoreal) VALUES (?, NULL, 0, 0)', 
              [proyectoId]
          );
  
          await connection.commit();
  
          res.status(201).json({ 
              proyecto: { id: proyectoId, cliente, ubicacion, descripcion, fecha_inicio, fecha_fin, empresa_id },
              presupuestoDetalle: { id: budgetDetailResult.insertId, proyecto_id: proyectoId }
          });
      } catch (error) {
          await connection.rollback();
          console.error(error);
          res.status(500).json({ error: 'Error al crear el proyecto y el detalle del presupuesto' });
      }
  };
  
  
      

    const updateProyecto = async (req, res) => {
    const { id } = req.params;
    const { cliente, ubicacion, descripcion, fecha_inicio, fecha_fin, empresa_id } = req.body;
    try {
        await (await db).query('UPDATE Proyecto SET cliente = ?, ubicacion = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, empresa_id = ? WHERE id = ?', 
        [cliente, ubicacion, descripcion, fecha_inicio, fecha_fin, empresa_id, id]);
        res.json({ id, cliente, ubicacion, descripcion, fecha_inicio, fecha_fin, empresa_id });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    };

    const deleteProyecto = async (req, res) => {
    const { id } = req.params;
    try {
        await (await db).query('DELETE FROM Proyecto WHERE id = ?', [id]);
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
