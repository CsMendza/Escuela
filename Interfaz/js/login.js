window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function () {
            window.location.href = "loginM.html"
        });

        document.querySelector('.btn-3').addEventListener('click', function () {
            window.location.href = "AdminsLog.html"
        });

        document.querySelector('.btn-primary').addEventListener('click', login);
    } else {
        window.location.href = "inicio.html";
    }

}

function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    console.log(mail, pass);
    axios({
        method: 'post',
        url: 'http://localhost:3000/Alumno/login',
        data: {
            Expediente: mail,
            Contraseña: pass
        }
    }).then(function (res) {
        if (res.data.code === 200) {
            localStorage.setItem("expediente", mail); // Modificación: almacenar el expediente en el LocalStorage
            localStorage.setItem("token", res.data.message);
            window.location.href = "inicio.html";
        } else {
            alert("Usuario y/o Contraseña Incorrectos");
        }
    }).catch(function (err) {
        console.log(err);
    })
}
