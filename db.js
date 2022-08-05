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

//obtener usuarios      
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


  
/*
const eliminarPorRut = async (rut) => {
  const SQLquery = {
    text: `DELETE FROM clientes WHERE rut = $1 RETURNING *;`,
    values: [rut]
  };
  console.log(rut)
  const result = await pool.query(SQLquery);
  return result.rows[0];
};*/

const deleteCliente = async (rut) => {
  const { rows } = await pool.query(
    `DELETE FROM clientes WHERE rut = ${rut}`
  );
 
  return rows;
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
async function newService( rut, fecha_solicitud, numero_certificacion, tipo_trabajo, fecha_entrega, estado_solicitud, codigo_equipo){
  console.log("acceso a la funcion de guardar cliente")
  const result = await pool.query (
        `INSERT INTO solicitud_de_servicio  (rut_id, fecha_solicitud, numero_certificacion, tipo_trabajo, fecha_entrega, estado_solicitud, codigo_equipo) 
      values ('${rut}', '${fecha_solicitud}', '${numero_certificacion}', '${tipo_trabajo}', '${fecha_entrega}', '${estado_solicitud}', '${codigo_equipo}') RETURNING *;`
      );
    const cliente = result.rows[0];
    return cliente;
}

//obtener solicitudes de servicios
async function getSolicitudDeServicio() {
  try {
    const result = await pool.query(
      `SELECT * FROM solicitud_de_servicio`
      ); // WHERE email  y rut 
    console.log("acceso a guardar cliente")
    const cliente = result.rows;
    return cliente;
    } catch (e) {
      throw e;
    }
  }

// agregar nuevos equipos
async function nuevoEquipo( codigo_equipo, nombre_equipo, modelo, estado_equipo){
  console.log("acceso a la funcion de nuevo equipo")
  const result = await pool.query (
        `INSERT INTO equipos  ( codigo_equipo, nombre_equipo, modelo, estado_equipo) 
      values ('${codigo_equipo}', '${nombre_equipo}', '${modelo}' ,'${estado_equipo}') RETURNING *;`
      );
    const cliente = result.rows[0];
    return cliente;
}

//obtener equipos
async function getEquipos(){
  const result = await pool.query (
    `SELECT  * FROM  equipos`
  );
  const cliente = result.rows;
  return cliente;
}
//lo ultimo agregue

 
module.exports = {
  newService,
  nuevoCliente,
  getClientes,
  getSolicitudDeServicio,
  nuevoEquipo,
  getEquipos,
  getUserByEmail,
  deleteCliente,
  getDeleteUser,
 };