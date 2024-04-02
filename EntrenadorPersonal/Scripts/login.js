function login() {

    //Obtenemos usaurio y contraseña
    var usuario = document.getElementById("txtusuario").value;
    var contra = document.getElementById("txtpassword").value;

    //Llamar a la funcion de login
    $.get("Login/ingresarLogin/?usuario=" + usuario + "&password=" + contra, function (data) {
        if (data == 0) {
            alert("Usuario o contraseña incorrectos");
        }else{
            document.location.href = "Main/Index";
        }
    });
}