window.onload = init;
var Headers = {};
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem("token")){
        Headers = {
            Headers:{
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
        loadCalificaciones();
    }
    document.querySelector('.btn-secondary').addEventListener('click', function(){
        localStorage.clear();
        window.location.href = "login.html"
    });
    document.querySelector('.btn-primary').addEventListener('click', login);
}


function loadCalificaciones() {
    axios
      .get(url + "/Maestro/Calificaciones", Headers)
      .then(function (res) {
        displayMaterias(res.data.message);
      })
      .catch(function (err) {});
  }
  
  function displayMaterias(Datos) {
    var body = document.querySelector("body");
  
    // Crear el contenedor de la tabla
    var tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");
  
    // Crear la tabla
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
  
    // Crear encabezados de columna
    var headers = [];
    var headerRow = document.createElement("tr");
    headers.forEach(function (headerText) {
      var headerCell = document.createElement("th");
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });
  
    // Agregar encabezado para el botón "Subir"
    var subirHeader = document.createElement("th");
    subirHeader.textContent = "Subir";
    headerRow.appendChild(subirHeader);
  
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // Agregar filas de datos
    Datos.forEach(function (Materia, index) {
      var row = document.createElement("tr");
      var dataValues = [
        Materia.uno,
        Materia.dos,
        Materia.tres,
        Materia.cuatro,
        Materia.cinco,
        Materia.seis,
        Materia.siete,
        Materia.ocho,
        Materia.nueve,
        Materia.diez,
      ];
      dataValues.forEach(function (value) {
        var cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
  
      // Agregar columna con el botón "Subir" a todas las filas excepto la primera
      if (index > 0) {
        var subirCell = document.createElement("td");
        var subirButton = document.createElement("button");
        subirButton.textContent = "Subir";
        subirCell.appendChild(subirButton);
        row.appendChild(subirCell);
      }
  
      tbody.appendChild(row);
  
      // Agregar las tres filas adicionales
      for (var i = 0; i < 3; i++) {
        var newRow = document.createElement("tr");
  
        for (var j = 0; j < dataValues.length; j++) {
          var cell = document.createElement("td");
  
          var selector = document.createElement("select");
  
          for (var k = 0; k <= 10; k++) {
            var option = document.createElement("option");
            option.value = k;
            option.textContent = k;
            selector.appendChild(option);
          }
  
          cell.appendChild(selector);
  
          newRow.appendChild(cell);
        }
  
        // Agregar columna con el botón "Subir" a las filas adicionales
        var subirCell = document.createElement("td");
        var subirButton = document.createElement("button");
        subirButton.textContent = "Subir";
        subirCell.appendChild(subirButton);
        newRow.appendChild(subirCell);
  
        tbody.appendChild(newRow);
      }
    });
  
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    body.appendChild(tableContainer);
  }
  