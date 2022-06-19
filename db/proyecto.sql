
	
CREATE TABLE cliente(
	rut VARCHAR (15) primary key,
	nombre VARCHAR (30) NOT NULL,
	apellido VARCHAR (30)NOT NULL,
	telefono INT NOT NULL,
	dirección VARCHAR (50) NOT NULL,
	email VARCHAR (60) NOT NULL,
	password VARCHAR (60) NOT NULL
	
);
    
	select * from cliente
	
CREATE TABLE equipo(
	codigo_equipo VARCHAR(20) primary key,
	nombre_equipo VARCHAR(30),
	modelo VARCHAR(30),
	estado_equipo VARCHAR(15)
);

	select * from equipo
	
CREATE TABLE solicitud_de_servicio(
	id_solicitud SERIAL primary key,
	rut_id VARCHAR(15),
	fecha_solicitud VARCHAR(20),
	numero_certificacion VARCHAR(15),
	tipo_trabajo VARCHAR (20),
	fecha_entrega VARCHAR (20),
	estado_solicitud VARCHAR(25),
	codigo_equipo VARCHAR (20),
	foreign key(rut_id) references cliente (rut),
	foreign key(codigo_equipo) references equipo (codigo_equipo)
	
);

	 select * from solicitud_de_servicio