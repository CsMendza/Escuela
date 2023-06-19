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
    }
    else{
        window.location.href = "adminsLog.html";
    }

    document.querySelector('.btn-1').addEventListener('click', function(){
        window.addEventListener('beforeunload', function () {
            localStorage.clear();
        });
        window.location.href = "index.html"
    });
    document.querySelector('.btn-primary').addEventListener('click', function(){
        window.location.href = "AgregarA.html"
    });
    document.querySelector('.btn-3').addEventListener('click', function(){
        window.location.href = "AgregarM.html"
    });
    document.querySelector('.btn-5').addEventListener('click', function(){
        window.location.href = "AdminsAlumnos.html"
    });
    document.querySelector('.btn-6').addEventListener('click', function(){
        window.location.href = "AdminsMaestros.html"
    });


    /*window.addEventListener('beforeunload', function () {
        localStorage.clear();
    });*/
    
}


