const express = require('express');
const app = express();
const pokedex = require('.poke.json');



app.get("/", (req, res, next) => {
    const pokemon = pokedex.pokemon; //el .pokemon es porque es la primera llave
    res.send(pokemon);
}) 

app.get("/:name", (req, res, next) => {  //Cuando le ponemos diagonal en el get es para dirigirnos a la siguiente pagina
    res.status(200)                                             //req = request o peticion, el dato que nos va a estar enviando el usuario
    console.log(req.params.name);
    res.send("Estas en la pagina Nombre");
});

app.listen(process.env.PORT || 3000, () => { 
    console.log("Server is running...");
});