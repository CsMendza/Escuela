const express = require('express');
const jwt = require('jsonwebtoken');
const Maestro = express.Router(); 
const db = require('../config/database');

Maestro.post("/", async (req, res, next) => {
    const {ExpedienteM, ContraseñaM} = req.body

    if(ExpedienteM && ContraseñaM){
        let query = "INSERT INTO maestros(ExpedienteM, ContraseñaM)";
        query += ` VALUES ('${ExpedienteM}', '${ContraseñaM}');`;
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message: "Maestro Registrado"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrio Un Error"});
    }
    return res.status(500).json({code:500, message: "Campos Incompletos"});
});//crear Maestros

Maestro.post("/login", async(req, res, next) =>{
    const {Expediente, Contraseña} = req.body;
    const query = `SELECT * FROM datosm WHERE Expediente = '${Expediente}' AND Contraseña = '${Contraseña}';`;
    const rows = await db.query(query);

    if(Expediente && Contraseña){
        if(rows.length == 1){
            const token = jwt.sign({
                Expediente: rows[0].Expediente,
                Contraseña: rows[0].Contraseña
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token});
        }
        else{
            return res.status(401).json({code: 401, message: "Usuario y/o Contraseña Incorrectos"});
        }
    }
    return res.status(500).json({code:500, message: "Incompleto"});

});

Maestro.get("/Materias", async(req, res, next) =>{
    const mat = await db.query(`SELECT * FROM alumnos WHERE Grado = 1 AND Grupo = "Matutino" ;`);
    return res.status(200).json({code: 1, message: mat});
});

Maestro.get("/Calificaciones", async(req, res, next) =>{
    const mat = await db.query(`SELECT * FROM materias WHERE idMateria = 1;`);
    return res.status(200).json({code: 1, message: mat});
});

Maestro.get("/",async(req, res, next)=>{
    const alm = await db.query("SELECT * FROM alumnos");
    return res.status(200).json({code: 1, message: alm});
});

module.exports = Maestro;