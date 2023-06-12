window.onload = init;

function init(){
    if(localStorage.getItem("token")){
        Headers = {
            Headers:{
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }
    else{
        window.location.href = "adminsLog.html";
    }
    document.querySelector('.btn-salir').addEventListener('click', function(){
        window.location.href = "admins.html"
    });
}

function signin(){
    var name = document.getElementById('input-name').value;
    var lname = document.getElementById('input-lname').value;
    var phone = document.getElementById('input-phone').value;
    var direction = document.getElementById('input-direction').value;
    var Nac = document.getElementById('input-Nac').value;

    axios({
        method:'post',
        url: 'http://localhost:3000/Alumno/Maestro',
        data: {
            Nombre: name,
            Apellidos: lname,
            Telefono: phone,
            Domicilio: direction,
            FechaNac: Nac
        },
        headers: {
            'Authorization': 'bearer '+ localStorage.getItem('token')
        }
    }).then(function(res){
        console.log(res);
        alert("Maestro Registrado correctamente");
    }).catch(function(err){
        console.log(err);
    })
}