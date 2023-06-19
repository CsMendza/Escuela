const express = require('express');
const jwt = require('jsonwebtoken');
const Alumno = express.Router(); 
const db = require('../config/database');
const crypto = require('crypto');


Alumno.post("/Alumno", async (req, res, next) => {
    const { Nombre, Apellidos, Grado, Grupo,  Telefono, Domicilio, FechaNac } = req.body

    if (Nombre && Apellidos && Grado && Grupo && Telefono && Domicilio && FechaNac) {
        // Generar contraseña aleatoria
        const password = crypto.randomBytes(5).toString('hex').slice(0, 10); // Genera una contraseña de 10 caracteres hexadecimales
        
        let query = "INSERT INTO alumnos(Nombre, Apellidos, Grado, Grupo, Telefono, Domicilio, FechaNac)";
        query += ` VALUES ('${Nombre}', '${Apellidos}', '${Grado}', '${Grupo}','${Telefono}', '${Domicilio}', '${FechaNac}');`;
        
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            // Copiar expediente y contraseña a otra tabla
            const AlumnoId = rows.insertId; // Obtener el ID del maestro insertado

            let copyQuery = "INSERT INTO datos(Expediente, Contraseña)";
            copyQuery += ` VALUES ('${AlumnoId}', '${password}');`;
            
            await db.query(copyQuery);

            return res.status(200).json({ code: 200, message: "Maestro Registrado" });
        }
        
        return res.status(200).json({ code: 401, message: "Ocurrió un error" });
    }

    return res.status(500).json({ code: 500, message: "Incompleto" });
});
//crear alumnos

Alumno.post("/Maestro", async (req, res, next) => {
    const { Nombre, Apellidos, Telefono, Domicilio, FechaNac } = req.body

    if (Nombre && Apellidos && Telefono && Domicilio && FechaNac) {
        // Generar contraseña aleatoria
        const password = crypto.randomBytes(4).toString('hex').slice(0, 10); // Genera una contraseña de 8 caracteres hexadecimales
        
        let query = "INSERT INTO maestros(Nombre, Apellidos, Telefono, Domicilio, FechaNac)";
        query += ` VALUES ('${Nombre}', '${Apellidos}', '${Telefono}', '${Domicilio}', '${FechaNac}');`;
        
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            // Copiar expediente y contraseña a otra tabla
            const maestroId = rows.insertId; // Obtener el ID del maestro insertado

            let copyQuery = "INSERT INTO datosm(Expediente, Contraseña)";
            copyQuery += ` VALUES ('${maestroId}', '${password}');`;
            
            await db.query(copyQuery);

            return res.status(200).json({ code: 200, message: "Maestro Registrado" });
        }
        
        return res.status(200).json({ code: 401, message: "Ocurrió un error" });
    }

    return res.status(500).json({ code: 500, message: "Incompleto" });
});//Crear Maestro

Alumno.post("/login", async(req, res, next) =>{
    const {Expediente, Contraseña} = req.body;
    const query = `SELECT * FROM datos WHERE Expediente = '${Expediente}' AND Contraseña = '${Contraseña}';`;
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
    const query = "SELECT * FROM alumnos";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows});
});//Ver alumnos

Alumno.get("/Grado", async(req, res, next) => {
    const query = "SELECT * FROM materias WHERE GRADO = 1";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows});
});//Ver Materias

Alumno.get("/Alumno", async(req, res, next) => {
    const query = "SELECT * FROM alumnos WHERE Expediente = 300033 ";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows});
});//Ver alumnos




  
module.exports = Alumno;