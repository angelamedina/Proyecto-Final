const { Router } = require("express");
const db = require("../db.js");

const requiresAuth = require("../middlewares/requiresAuth.js");

const router = Router();


router.get("/" , (req, res) => {
    res.render("Home");
})

router.get("/registro" , (req, res) => {
    res.render("Registro");
})

router.get("/login" , (req, res) => {
    res.render("Login");
})

router.get("/admin" , async (req, res) => {
    const clientes =await db.getClientes();
    res.render("Admin", { clientes });
})

router.get("/equipos", async (req,res) => {
    const clientes = await db.getEquipos();
    res.render("Equipos", { clientes });
})

router.get("/servicio" , (req, res) => {
    res.render("Servicio");
})

router.get("/listadoC" , async(req, res) => {
    const clientes = await db.getEquipos ();
    res.render("ListadoC", { clientes });
})

//lo ultimo agregado
router.get("/listadoA" , async(req, res) => {
    const clientes = await db.getSolicitudDeServicio ();
    res.render("ListadoA", { clientes });
})


//revisar


module.exports = router;