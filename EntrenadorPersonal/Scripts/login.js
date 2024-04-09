
document.addEventListener("DOMContentLoaded", function () {
    // Asegúrate de que el DOM esté completamente cargado antes de asignar el manejador de eventos
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario
        login(); // Llama a tu función de login
    });
});
function login() {
    var usuario = document.getElementById("txtusuario").value;
    var contra = document.getElementById("txtpassword").value;

    // Uso de $.ajax con método POST
    $.ajax({
        url: "Login/ingresarLogin",
        type: "POST",
        data: { usuario: usuario, password: contra },
        success: function (data) {
            console.log(data);
            if (data.toString() === "0") {
                alert("Usuario o contraseña incorrectos");
            } else {
                console.log("Cambiamos de pagina");
                window.location.href = "Main/Index";
            }
        },
        error: function (xhr, status, error) {
            // Manejo básico de errores
            console.error("Error en la solicitud: ", status, error);
            alert("Hubo un problema al intentar logearse.");
        }
    });
}

