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
async function newService( rut_id, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo){
  console.log("acceso a la funcion de guardar cliente")
  const result = await pool.query (
        `INSERT INTO solicitud_de_servicio  (  rut_id, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo) 
      values ( '${rut_id}', '${fecha_solicitud}', '${numero_certificacion}' ,'${fecha_entrega}', '${estado_solicitud}', '${codigo_equipo}') RETURNING *;`
      );
    const cliente = result.rows[0];
    return cliente;
}

//obtener solicitudes de servicio
async function newService () {
  const result = await pool.query (
    `SELECT * FROM  solicitud_de_servicio`
  );
  const cliente = result.rows;
  return cliente;
}

// agregar nuevos equipos
async function nuevoEquipo( codigo_equipo, nombre_equipo, modelo, estado_equipo){
  console.log("acceso a la funcion de nuevo equipo")
  const result = await pool.query (
        `INSERT INTO equipos  ( codigo_equipo, nombre_equipo, modelo, estado_equipo) 
      values ( '${codigo_equipo}', '${nombre_equipo}', '${modelo}' ,'${estado_equipo}') RETURNING *;`
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
  nuevoEquipo,
  getEquipos,
  getUserByEmail,
  getUserByRut,
  getDeleteUser,
 };