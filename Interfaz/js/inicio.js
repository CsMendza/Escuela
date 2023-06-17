window.onload = init;
var Headers = {};
var url = "http://localhost:3000";

function init() {
  if (localStorage.getItem("token")) {
    Headers = {
      Headers: {
        'Authorization': "Bearer " + localStorage.getItem("token")
      }
    }
    loadMaterias();
  }
  else {
    window.location.href = "index.html";
  }

  /*window.addEventListener('beforeunload', function () {
      localStorage.clear();
  });*/
}

function loadMaterias() {
  axios.get(url + "/Alumno/Grado", Headers)
    .then(function (res) {
      displayMaterias(res.data.message); 
    }).catch(function (err) {
    });
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
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Agregar filas de datos
  Datos.forEach(function (Materia) {
    var row = document.createElement("tr");
    var dataValues = [Materia.uno, Materia.dos, Materia.tres, Materia.cuatro, Materia.cinco, Materia.seis, Materia.siete, Materia.ocho, Materia.nueve, Materia.diez];
    dataValues.forEach(function (value) {
      var cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableContainer.appendChild(table);
  body.appendChild(tableContainer);
}

