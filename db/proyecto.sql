CREATE TABLE clientes(
	rut VARCHAR (15) primary key,
	nombre VARCHAR (30) NOT NULL,
	apellido VARCHAR (30)NOT NULL,
	telefono INT NOT NULL,
	direccion VARCHAR (60) NOT NULL,
	email VARCHAR (60) NOT NULL,
	password VARCHAR (60) NOT NULL
	
);
   select * from clientes;
 	
CREATE TABLE equipos(
	codigo_equipo VARCHAR(20) primary key,
	nombre_equipo VARCHAR(30),
	modelo VARCHAR(30),
	estado_equipo VARCHAR(15)
);

	select * from equipos;
	
CREATE TABLE solicitud_de_servicio(
	id_solicitud SERIAL primary key,
	rut_id VARCHAR(15),
	fecha_solicitud VARCHAR(20),
	numero_certificacion VARCHAR(15),
	tipo_trabajo VARCHAR (20),
	fecha_entrega VARCHAR (20),
	estado_solicitud VARCHAR(25),
	codigo_equipo VARCHAR (20),
	foreign key(rut_id) references clientes (rut),
	foreign key(codigo_equipo) references equipos (codigo_equipo)
	
);

	 select * from solicitud_de_servicio;