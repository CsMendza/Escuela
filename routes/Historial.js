const express = require('express');
const Historial = express.Router(); 
const db = require('../config/database');

Historial.post("/", async (req, res, next) =>{                //Agregar Alumnos
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
})

Historial.put("/:id([0-9]{1-6})", async (req, res, next) =>{
    const { Nombre, Apellido } = req.body;
    if(Nombre && Apellido){
        let query = `UPDATE datos SET Nombre='${Nombre}', Apellido='${Apellido}' WHERE Expediente=${req.params.id};`;
        
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Datos Actualizados Correctamente"});
        }       

        return res.status(500).json({code: 500, message: "Ocurrio un Error"});
    }
    return res.status(500).json({code:500, message: "Campos Incompletos"});
});

Historial.patch('/:id([0-9]{1-3})', async (req, res, next) =>{
    if(req.body.Nombre){
        let query = `UPDATE datos SET Nombre='${req.body.Nombre}' WHERE Expediente=${req.params.id}};`;
        
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Datos Actualizados Correctamente"}); 
        }   
        return res.status(500).json({code: 500, message:"Error"});
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"})
});

Historial.get('/', async (req, res, next) => {
    const alm = await db.query("SELECT * FROM datos");
    return res.status(200).json({code: 200, message: alm});
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

module.exports = Historial;