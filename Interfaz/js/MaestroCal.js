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
    loadCalificaciones();
  }
}

function loadCalificaciones() {
  axios
    .get(url + "/Maestro/Calificaciones", Headers)
    .then(function (res) {
      displayMaterias(res.data.message);
      addSubmitButton(); // Agregar el botón después de mostrar la tabla
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
  var headers = [
    "Grado",
    "Nombre",
    "Calificación"
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
      alumno.Grado,
      alumno.Nombre
    ];
    dataValues.forEach(function (value) {
      var cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    // Crear la celda del selectbox
    var selectCell = document.createElement("td");
    var select = document.createElement("select");

    // Agregar opciones al selectbox
    for (var i = 0; i <= 10; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }

    selectCell.appendChild(select);
    row.appendChild(selectCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableContainer.appendChild(table);
  body.appendChild(tableContainer);
}

function addSubmitButton() {
  var body = document.querySelector("body");

  // Crear el contenedor del botón
  var buttonContainer = document.createElement("div");
  buttonContainer.style.textAlign = "center";
  buttonContainer.style.marginTop = "20px";

  // Crear el botón
  var button = document.createElement("button");
  button.textContent = "Enviar Calificaciones";
  button.style.padding = "10px 20px";
  button.style.fontSize = "16px";
  button.style.backgroundColor = "#4CAF50";
  button.style.color = "white";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.addEventListener("click", submitCalificaciones);

  buttonContainer.appendChild(button);
  body.appendChild(buttonContainer);
}

function submitCalificaciones() {
  axios
    .post(url + "/Maestro/Calificaciones", Headers)
    .then(function (res) {
    })
    .catch(function (err) {});
  console.log("Calificaciones enviadas");
  alert("Calificaciones Agregadas Correctamente");
}
