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


// Vistas
app.use("/", require("./routes/views"));

// API REST
app.use("/api", require("./routes/api"));



app.get("*" , (req,res) =>{
    res.redirect("/");
});


