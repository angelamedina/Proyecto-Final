const express = require ("express");

const exphbs = require ("express-handlebars");
const expressFileUpload = require ("express-fileupload");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const SECRET_KEY = "kkk";
require("dotenv").config();
const path = require ("path");

const app = express();

const db = require("./db")

//Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SERVER ON http://localhost:3000"))

//Middlewares

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(
    expressFileUpload({
        limits: 5_000_000,
        abortOnLimit: true,
        responseOnLimit: "El tamaño supera lo permitido",
        createParentPath: true
    })
);

//public folders
app.use(express.static(__dirname + '/public'))
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));


app.engine(
    "hbs",
    exphbs.engine({
        extname: '.hbs',
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        //layoutsDir: __dirname + "/views/layouts",
        //partialsDir: __dirname + "views/partials",
    })
);

app.set("view engine", "hbs");

//vistas
// app.get("/" ,  (req, res) => {
//     res.render("Home")
// });

// app.get("/registro" , (req, res) => {
//     res.render("Registro");
// });

// app.get("/login" , (req, res) => {
//     res.render("Login");
// })

// app.get("/admin" , async (req, res) => {
//     const clientes =await db.getClientes();
//     res.render("Admin", { clientes });
// })

// app.get("/admin" ,  (req, res) => { 
//         res.render("Admin");
// })


// app.post("/cliente", async (req, res) => {
//     const { rut, nombre, apellido, telefono, direccion, email, password } = req.body;
//     try {
//       const cliente = await nuevoCliente (rut, nombre, apellido, telefono, direccion, email, password);
//        res.status(201).send(cliente);
//     } catch (e) {
//         res.status(500).send({
//             error: `Algo salio mal   ${e}` ,
//             code:500
//         })
//     };
    
// })

// Vistas
app.use("/", require("./routes/views"));

// API REST
app.use("/api", require("./routes/api"));



app.get("*" , (req,res) =>{
    res.redirect("/");
});

// Paso 3
/*
app.get("/Registro", (req, res) => {
    res.send(`
    <form method="POST" 
    <input type="text" name="rut" required placeholder="Rut">
    <input type="text" name="nombre" required placeholder="Nombre">
    <input type="text" name="apellido" required placeholder="Apellido">
    <input type="text" name="telefono" required placeholder="Telefono">
    <input type="text" name="email" required placeholder="Email">
    <input type="text" name="password" required placeholder="Password">
 
    <button> Registro </button>
    </form>
    `);
    });

    // Paso 4
    app.post("/Registro", (req, res) => {
    const { rut, nombre, apellido, telefono, email,  password } = req.body;
    const name = `${rut} ${nombre} ${apellido} ${telefono} ${email} ${password}`;
    cancion.mv(`${__dirname}/canciones/${name}.mp3`, (err) => {
    
    res.send("Archivo cargado con éxito");
    });
    });
    */