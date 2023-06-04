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
    const {ExpedienteM, ContraseñaM} = req.body;
    const query = `SELECT * FROM maestros WHERE ExpedienteM = '${ExpedienteM}' AND ContraseñaM = '${ContraseñaM}';`;
    const rows = await db.query(query);

    if(ExpedienteM && ContraseñaM){
        if(rows.length == 1){
            const token = jwt.sign({
                Maestro_id: rows[0].Maestro_id,
                ExpedienteM: rows[0].ExpedienteM
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token});
        }
        else{
            return res.status(401).json({code: 401, message: "Usuario y/o Contraseña Incorrectos"});
        }
    }
    return res.status(500).json({code:500, message: "Incompleto"});

})

Maestro.get("/", async(req, res, next) => {
    const query = "SELECT * FROM maestros";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows});
});//Ver alumnos

module.exports = Maestro;