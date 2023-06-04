const express = require('express');
const jwt = require('jsonwebtoken');
const Alumno = express.Router(); 
const db = require('../config/database');

Alumno.post("/signin", async (req, res, next) => {
    const {Expediente, Contraseña} = req.body

    if(Expediente && Contraseña){
        let query = "INSERT INTO alumnos(Expediente, Contraseña)";
        query += ` VALUES ('${Expediente}', '${Contraseña}');`;
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "Usuario Registrado"});
        }
        return res.status(200).json({ code: 401, message: "Ocurrio Un Error"});
    }
    return res.status(500).json({code:500, message: "Incompleto"});
});//crear alumnos

Alumno.post("/login", async(req, res, next) =>{
    const {Expediente, Contraseña} = req.body;
    const query = `SELECT * FROM Alumnos WHERE Expediente = '${Expediente}' AND Contraseña = '${Contraseña}';`;
    const rows = await db.query(query);

    if(Expediente && Contraseña){
        if(rows.length == 1){
            const token = jwt.sign({
                Alumno_id: rows[0].Alumno_id,
                Expediente: rows[0].Expediente
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token});
        }
        else{
            return res.status(401).json({code: 401, message: "Usuario y/o Contraseña Incorrectos"});
        }
    }
    return res.status(500).json({code:500, message: "Incompleto"});

})

Alumno.get("/", async(req, res, next) => {
    const query = "SELECT * FROM Alumnos";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows});
});//Ver alumnos

module.exports = Alumno;