window.onload = init;
var Headers = {};
var url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")){
        Headers = {
            Headers:{
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
        loadDatos();
    }
    else{
        window.location.href = "index.html";
    }

    /*window.addEventListener('beforeunload', function () {
        localStorage.clear();
    });*/
}

function loadDatos() {
    axios.get(url + "/Alumno/Grado", Headers)
      .then(function (res) {
        console.log(res);
        var gradoAlumno = res.data.message[0].Grado; // Obtén el Grado del alumno
        obtenerMaterias(gradoAlumno); // Llama a la función para obtener las materias del grado del alumno
      }).catch(function (err) {
        console.log(err);
      });
  }
  
  function obtenerMaterias(gradoAlumno) {
    axios.get(url + "/Alumno/Grado") // Ajusta la URL para obtener las materias de la tabla correspondiente
      .then(function (res) {
        console.log(res);
        var materias = res.data.message;
  
        // Filtra las materias que coincidan con el grado del alumno
        var materiasFiltradas = materias.filter(function (materia) {
          return materia.Grado === gradoAlumno;
        });
  
        displayDatos(materiasFiltradas); // Llama a la función para mostrar los datos
      }).catch(function (err) {
        console.log(err);
      });
  }
  
  function displayDatos(Datos) {
    var body = document.querySelector("body");
    for (var i = 0; i < Datos.length; i++) {
      body.innerHTML += `<h3>${Datos[i].uno}</h3>`;
    }
  }
  
