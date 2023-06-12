const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = express.Router(); 
const db = require('../config/database');

Admin.post("/login", async(req, res, next) =>{
    const {Correo, Contraseña} = req.body;
    const query = `SELECT * FROM Administradores WHERE Correo = '${Correo}' AND Contraseña = '${Contraseña}';`;
    const rows = await db.query(query);

    if(Correo && Contraseña){
        if(rows.length == 1){
            const token = jwt.sign({
                Correo: rows[0].Correo,
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

module.exports = Admin;