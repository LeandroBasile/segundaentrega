// require("dotenv").config();

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// const PORT = process.env.PORT || 8080;

// const express = require("express");
// const app = express();
// const rutas = require("./src/index.js");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/api", express.static(__dirname + "/public")); //_dirname path absoluto

// app.use("/api", rutas);

// app.listen(PORT, () => [console.log("server escuchando puerto: ", PORT)]);

import dotenv from "dotenv";
dotenv.config();
import express  from 'express';
const app = express();




import router from './src/routes/index.js';



const port = process.env.PORT || 3000;

//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`)
    console.log(process.env.PORT);
});


app.get('/', (req, res) => {
    res.send('las rutas comienzan con " /api " !!')
})

app.use('/api/', router)


