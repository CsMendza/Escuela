const express = require('express');
const jwt = require('jsonwebtoken');
const Datos = express.Router(); 
const db = require('../config/database');


Datos.get("/", async(req, res, next) => {
    const query = "SELECT * FROM datos";
    const rows = await db.query(query);

    
    return res.status(200).json({ code: 200, message: rows});
});//Ver alumnos

module.exports = Datos;