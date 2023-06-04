window.onload = init;

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', function(){
        window.location.href = "login.html"
    });

    document.querySelector('.btn-primary').addEventListener('click', login);
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    console.log(mail, pass);
    axios({
        method: 'post' ,
        url: 'http://localhost:3000/Maestro/login',
        data: {
            ExpedienteM: mail,
            ContraseñaM: pass
        }
    }).then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
}