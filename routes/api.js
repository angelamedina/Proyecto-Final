const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

const db = require("../db.js");

const router = Router();

router.get("/clientes" , async(req, res) => {
    const clientes = await db.getClientes();
    res.send(clientes);
});


router.post("/registro",  async (req, res) => {
      try {  
        const { rut, nombre, apellido, telefono, direccion, email,  password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("acceso a la ruta registro")
        //alert("acceso a la ruta registro")
        
        const cliente = await db.nuevoCliente(rut, nombre, apellido, telefono, direccion, email, hashedPassword);
        res.status(201).send(cliente);
      } catch (error) { 
        res.status(500).send(error);
      }
});


router.post('/login' , async (req,res) => {
        try { 
            const { email, password } = req.body;
            if (!email) return res.status(400).send("El email es requerido");
            if (!password) return res.status(400).send("La contraseña es requerida");
    
            const user = await db.getUserByEmail(email);

            if (!user) {
                return res.status(404).send ({
                error: "Este cliente esta registrado",
                code:404,
            })
            }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ 
                error: "credencial invalida",
                code: 400
            });
            }
        //para evitar que vulneren nuestras claves
        //const { password: p, ...userWithoutPassword } = user;
        const token = jwt.sign(user, process.env.SECRET_KEY);
        res.send({user, token});
    }catch (error) {
        res.status(500).send(error)
    }


});

//nuevo servicio
router.post("/Servicio",  async (req, res) => {
        const { rut, fecha_solicitud, tipo_trabajo, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo } = req.body;
        try { 
        console. log("acceso a la ruta servicio")
        //alert("acceso a la ruta servicio")
        const user = await db.newService( rut, fecha_solicitud, tipo_trabajo, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo);
        res.status(201).send(user);
        } catch (e) {
            res.status(500).send(e)
        }
});

//ingresar equipo
router.post("/Equipos",  async (req, res) => {
    const { codigo_equipo, nombre_equipo, modelo, estado_equipo } = req.body;
    try { 
    console. log("acceso a la ruta equipos")
    //alert("acceso a la ruta servicio")
    const user = await db.nuevoEquipo( codigo_equipo, nombre_equipo, modelo, estado_equipo);
    res.status(201).send(user);
    } catch (e) {
        res.status(500).send(e)
    }
});

//listado equipos 
router.get("/ListadoC",  async(req, res) => {
            console.log("acceso a la ruta equipos")
            //alert("acceso a la ruta listadoC")
            const user = await db.getEquipos();
            res.status(201).send(user);
                
});


//listado servicios
router.get("/listadoA", async (req, res) => {
    console.log("accaeso a ruta servicios")
    const user = await db.newService ();
    res.status(201).send(user);
});

// Logout lo ultimo que agregue
/*router.get('/logout', function(req, res, next) {
    // remove the req.user property and clear the login session
    req.logout();
  
    // destroy session data
    req.session = null;
  
    // redirect to homepage
    res.redirect('/Home');
  });*/
       
module.exports = router;   