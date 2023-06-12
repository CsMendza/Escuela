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

Alumno.put("/Alumno", async (req, res, next) => {
    const { nombre, Apellidos, Grado, Grupo, Telefono, Domicilio, FechaNac } = req.body;
  
    if (nombre && Apellidos && Grado && Grupo && Telefono && Domicilio && FechaNac) {
      let query = `UPDATE empleados SET nombre='${nombre}', apellidos='${Apellidos}',`;
      query += ` Grado=${Grado}, Grupo=${Grupo}, Telefono=${Telefono}, Domicilio='${Domicilio}', FechaNac='${FechaNac}' WHERE id=${req.params.id};`;
      const rows = await db.query(query);
      if (rows.affectedRows === 1) {
        return res.status(201).json({ code: 201, message: "Alumno actualizado correctamente" });
      }
      return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
  });
  
/*Alumno.post("/Maestro", async (req, res, next) => {
    const {Nombre, Apellidos, Telefono, Domicilio, FechaNac} = req.body

    if(Nombre && Apellidos && Telefono && Domicilio && FechaNac){
        let query = "INSERT INTO maestros(Nombre, Apellidos, Telefono, Domicilio, FechaNac)";
        query += ` VALUES ('${Nombre}', '${Apellidos}', '${Telefono}', '${Domicilio}', '${FechaNac}');`;
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "Maestro Registrado"});
        }
        return res.status(200).json({ code: 401, message: "Ocurrio Un Error"});
    }
    return res.status(500).json({code:500, message: "Incompleto"});
});//crear Maestros*/


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
    const query = "SELECT * FROM Alumnos";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows});
});//Ver alumnos

Alumno.get("/Grado", async(req, res, next) => {
    const query = "SELECT * FROM materias";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows});
});//Ver alumnos

/*Alumno.get("/Grado", async (req, res, next) => {
    const gradoId = req.body.gradoId; // Obtén el valor del grado desde el cuerpo de la solicitud (puedes cambiar "req.body.gradoId" según corresponda a tu caso)
  
    try {
      const query = `SELECT * FROM materias WHERE idMateria IN (SELECT Grado FROM alumnos WHERE Grado = ${gradoId})`;
      const rows = await db.query(query);
  
      return res.status(200).json({ code: 200, message: rows });
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ code: 500, message: "Error en el servidor" });
    }
  });*/

  

  
  
module.exports = Alumno;