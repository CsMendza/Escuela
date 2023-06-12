const express = require('express');
const jwt = require('jsonwebtoken');
const registro = express.Router(); 
const db = require('../config/database');

/*registro.post("/", async (req, res, next) =>{                //Agregar Alumnos
    const { Nombre, Apellido} = req.body;

    if(Nombre && Apellido){
        let query = "INSERT INTO datos(Nombre, Apellido)";
        query += ` VALUES('${Nombre}', '${Apellido}')`;
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Alumno Ingresado Correctamente"});
        }       

        return res.status(500).json({code: 500, message: "Ocurrio un Error"});
    }
    return res.status(500).json({code:500, message: "Campos Incompletos"});
})*/


registro.get('/', async (req, res, next) => {
    const alm = await db.query("SELECT * FROM alumnos");
    return res.status(200).json({code: 200, message: alm});
});

registro.post("/login", async(req, res, next) =>{
    const {Correo, Contraseña} = req.body;
    const query = `SELECT * FROM Administradores WHERE Correo = '${Correo}' AND Contraseña = '${Contraseña}';`;
    const rows = await db.query(query);

    if(Correo && Contraseña){
        if(rows.length == 1){
            const token = jwt.sign({
                Correo_id: rows[0].Correo_id,
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

registro.post("/registro", async (req, res, next) =>{
    const { Nombre, Apellido, telefono, fechanac, domicilio} = req.body;

    if(Nombre && Apellido && telefono && fechanac && domicilio){
        let query = "INSERT INTO alumnos(Nombre(s), Apellidos, Telefono, FechaNac, Domicilio)";
        query += ` VALUES('${Nombre}', '${Apellido}', '${telefono}', '${fechanac}', '${domicilio}')`;
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Alumno Ingresado Correctamente"});
        }       

        return res.status(500).json({code: 500, message: "Ocurrio un Error"});
    }
    return res.status(500).json({code:500, message: "Campos Incompletos"});
});
 
/*pokemon.delete('/:id([0-9]{1-3})', async(req, res, next) =>{
    const query = `DELETE FROM pokemon WHERE pok_id =${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({ code:200, message:"Pokemon borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"}); 
});*/


/*pokemon.get('/:id([0-9]{1-3})', async (req, res, next) => {  //Cuando le ponemos diagonal en el get es para dirigirnos a la siguiente pagina
    const id = req.params.id;
    if (id >= 0 && id <= 150) {
        const pkmn= await db.query("SELECT * FROM pokemon WHERE pok")
        return res.status(200).send(pk[req.params.id - 1])
    }                            
    return res.status(404).send("Pokemon no encontrado");
});*/

/*pokemon.get('/:name([A-Za-z]+)',(req, res, next) => {
    const name = req.params.name;

    const pkmn = pk.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;     
    }); 

    if (pkmn.length > 0){
        res.status(200).send(pkmn);
    }
    return res.status(404).send("Pokemon no encontrado");
})*/ 

module.exports = registro;