window.onload = init;
var Headers = {};
var url = "http://localhost:3000";

function init() {
  if (localStorage.getItem("token")) {
    Headers = {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token")
      }
    };
    loadAlumnos();
  }
}

function loadAlumnos() {
  axios
    .get(url + "/Alumno/Alumno", Headers)
    .then(function (res) {
      displayDatosA(res.data.message);
    })
    .catch(function (err) { });
}

function displayDatosA(Datos) {
  var body = document.querySelector("body");

  // Crear el contenedor de la tabla
  var tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");

  // Crear la tabla
  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  // Crear encabezados de columna
  var headers = [
    "Expediente",
    "Nombre(s)",
    "Apellidos",
    "Grado",
    "Grupo",
    "Calificación" // Nuevo encabezado de columna
  ];
  var headerRow = document.createElement("tr");
  headers.forEach(function (headerText) {
    var headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Agregar filas de datos
  Datos.forEach(function (alumno) {
    var row = document.createElement("tr");
    var dataValues = [
      alumno.Expediente,
      alumno.Nombre,
      alumno.Apellidos,
      alumno.Grado,
      alumno.Grupo,
    ];
    dataValues.forEach(function (value) {
      var cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    // Agregar botón a la nueva columna
    var buttonCell = document.createElement("td");
    var button = document.createElement("button");
    button.textContent = "Agregar";
    button.dataset.alumno = JSON.stringify(alumno); // Guardar la información del alumno en el botón
    button.addEventListener("click", function() {
      window.location.href = "calificaciones.html";
    });
    buttonCell.appendChild(button);
    row.appendChild(buttonCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableContainer.appendChild(table);
  body.appendChild(tableContainer);
}
