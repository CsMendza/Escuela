//Dependencias
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routes
const Historial = require('./routes/Historial');
const Alumno = require('./routes/Alumno');
const Maestro = require('./routes/Maestro');
const Datos = require('./routes/Datos');
//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');


app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", index);

app.use("/Datos", Datos);
app.use("/Maestro", Maestro);
app.use("/Alumno", Alumno);
app.use(auth);
app.use("/Historial", Historial);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => { 
    console.log("Server is running...");
});

//req = request o peticion 