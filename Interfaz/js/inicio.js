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


function loadDatos(){
    axios.get(url + "/Datos", Headers)
    .then(function(res){
        console.log(res);
        displayDatos(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayDatos(Datos){
    var body = document.querySelector("body");
    for(var i = 0; i < Datos.length; i++){
        body.innerHTML += `<h3>${Datos[i].Nombre}</h3>`;
    }
}
