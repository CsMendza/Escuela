window.onload = init;

function init() {
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href = "index.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', login);
    }
    else{
        window.location.href = "admins.html";
    }
    
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    console.log(mail, pass);
    axios({
        method: 'post' ,
        url: 'http://localhost:3000/Admin/login',
        data: {
            Correo: mail,
            Contraseña: pass
        }
    }).then(function(res){
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "admins.html";
        }
        else{
            alert("Usuario y/o Contraseña Incorrectos");
        }
    }).catch(function(err){
        console.log(err);
    })
}