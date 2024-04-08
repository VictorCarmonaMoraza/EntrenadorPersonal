function login() {

    //Obtenemos usaurio y contraseña
    var usuario = document.getElementById("txtusuario").value;
    var contra = document.getElementById("txtpassword").value;

    //Llamar a la funcion de login
    $.get("Login/ingresarLogin/?usuario=" + usuario + "&password=" + contra, function (data) {
        console.log(data);
        if (data.toString() === "0") {
            alert("Usuario o contraseña incorrectos");
        } else {
            console.log("Cambiamos de pagina");
            document.location.href = "Main/Index";
        }
    });
}

