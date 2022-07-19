const { Pool } = require ("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "pomonella21",
    database: "proyecto",
    port: 5433,
});

//nuevo usuario
async function nuevoCliente(rut,  nombre, apellido, telefono, direccion, email, password){
  console.log("acceso a la funcion de guardar cliente")
  const result = await pool.query (
        `INSERT INTO clientes  ( rut,  nombre, apellido, telefono, direccion, email, password) 
      values ('${rut}', '${nombre}', '${apellido}', '${telefono}' ,'${direccion}', '${email}','${password}') RETURNING *;`
      );
    const cliente = result.rows[0];
    return cliente;
}

//obtener usuarios       revisar auth si corresponde
async function getClientes() {
  try {
    const result = await pool.query(`SELECT * FROM clientes`); // WHERE email  y rut 
    return result.rows;
    } catch (e) {
      throw e;
    }
  }

//obtener usuarios por email
async function getUserByEmail(email) {
  try {
    const SQLQuery = {
      text: `SELECT * FROM clientes WHERE email = $1;`,
      values: [email]
    };
    const { rows } =await pool.query(SQLQuery);
    if (rows.length === 0) {
      throw 'Usuario no encontrado';
    }    
    return rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

//obtener usuarios por rut
async function getUserByRut(rut) {
  try {
    const SQLQuery = {
      text: `SELECT * FROM clientes WHERE rut = $1;`,
      values: [rut]
    };
    const { rows } =await pool.query(SQLQuery);
    if (rows.length === 0) {
      throw 'Usuario no encontrado';
    }    
    return rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

//eliminar usuarios por email
async function getDeleteUser(email) {
  try {
    const SQLQuery = {
      text: `DELETE FROM usuarios WHERE email = $1;`,
      values: [email]
    };

    await pool.query(SQLQuery);
  } catch (e) {
    throw e;
  }
}

//crear nueva solicitud de servicio
async function newService(id_solicitud, rut, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo){
  console.log("acceso a la funcion de guardar cliente")
  const result = await pool.query (
        `INSERT INTO clientes  ( id_solicitud, rut, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo) 
      values ('${id_solicitud}', '${rut}', '${fecha_solicitud}', '${numero_certificacion}' ,'${fecha_entrega}', '${estado_solicitud}',' ${codigo_equipo}') RETURNING *;`
      );
    const cliente = result.rows[0];
    return cliente;
}

 
/* 
  const updateSkater = async (skater) => {
    const values = Object.values(skater)
    const result = await pool.query(
      `UPDATE skaters SET  nombre = $1, password = $2 , anos_experiencia = $3 , especialidad = $4   RETURNING *;`
      , values);
    return result.rows[0];
  }
  
  updateSkater,
  deleteSkater
};
  */
 
module.exports = {
  nuevoCliente,
  getClientes,
  getUserByEmail,
  getUserByRut,
  getDeleteUser,
  newService,

};