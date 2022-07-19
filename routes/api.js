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

/* falta
router.get("/listadoC", async (req, res) => { 
    const clientes = await db.getClientes();
    console.log("acceso a la ruta listado : ", clientes )
    res.send(clientes);
});

router.get("/listadoA", async (req, res) => { 
    const clientes = await db.getClientes();
    console.log("acceso a la ruta listado : ", clientes )
    res.send(clientes);
});

apiRouter.put("/clientes", async (req, res) => { 
    const { id, auth } = req.body;
    const usuario = await db.setUsuarioStatus(id, auth);
    await sendEmail(usuario, false);
    res.send(usuario.auth);
});*/


//router.get("/listado")


     //deberia cambiar registro por clientes??
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
        const { id_solicitud, rut, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo } = req.body;
    
        console.log("acceso a la ruta servicio")
        //alert("acceso a la ruta servicio")
        const user = await db.newService(id_solicitud, rut, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo);
        res.status(201).send(user);
        
});

    /* falta 
    router.post("/ListadoA",  async (req, res) => {
         const { id_solicitud, rut, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo } = req.body;
        
        console.log("acceso a la ruta servicio")
            //alert("acceso a la ruta servicio")
        const user = await db.newService(id_solicitud, rut, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo);
        res.status(201).send(user);
            
        });

    router.post("/ListadoC",  async (req, res) => {
                const { id_solicitud, rut, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo } = req.body;
            
                console.log("acceso a la ruta servicio")
                //alert("acceso a la ruta servicio")
                const user = await db.newService(id_solicitud, rut, fecha_solicitud, numero_certificacion, fecha_entrega, estado_solicitud, codigo_equipo);
                res.status(201).send(user);
                
        });
        */
module.exports = router;   