$(document).ready(function () {
    // Código que quieres ejecutar una vez que el DOM esté listo
    GetClientesPorEntrenador();
});

function GetClientesPorEntrenador() {
     let entrenador = document.getElementById("idEntrenador").value;
    $.get("GetClientesPorEntrenador/?entrenadorId=" + parseInt(entrenador), function (data) {
        Crear_ListadoClientesPorEntrenador(data);
        console.log(data);
    })
}

function Crear_ListadoClientesPorEntrenador(data) {

    var contenido = "";
    contenido += "<table id='tablaClientes'  class ='table'>";

    contenido += `
    <thead>
        <tr>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Email</th>
        <th>Telefono</th>
        <th>Fecha de inicio</th>
        </tr>
     </thead>
`;
    contenido += "<tbody class='table-group-divider'>";
    var fila;
    for (var i = 0; i < data.length; i++) {
        fila = data[i];
        contenido += `
                <tr data-client-id="${fila.ClienteID}">
            <td><span class="clickeableNombre" data-client-id="${fila.ClienteID}">${fila.Nombre}</span></td>
            <td>${fila.Apellido}</td>
            <td>${fila.Email}</td>
            <td>${fila.Telefono}</td>
            <td>${fila.FechaInicio}</td>
        </tr>
        `
    }
    contenido += "</tbody>";

    contenido += "</table>";

    document.getElementById("listadoClientesPorEntrenador").innerHTML = contenido;
    $('#tablaClientes').DataTable({ searching: false });

}


function agregarManejadorClicsNombres() {
    // Utiliza delegación de eventos en el contenedor que contiene tu tabla
    // para asegurarte de que capturas los clics sin importar cuándo se agreguen los elementos a la tabla
    document.getElementById('listadoClientesPorEntrenador').addEventListener('click', function (e) {
        // Comprueba si el elemento clickeado o uno de sus ancestros tiene la clase 'clickeableNombre'
        var elementoClickeado = e.target.closest('.clickeableNombre');

        // Si se encontró un elemento con la clase 'clickeableNombre', obtén el clientId
        if (elementoClickeado) {
            var clientId = elementoClickeado.getAttribute('data-client-id');
            console.log('Cliente ID:', clientId);
            // Aquí puedes hacer lo que necesites con el clientId
            // Por ejemplo, mostrar más información del cliente en alguna parte de la página
            mostrarInformacionCliente(clientId);
        }
    });
}

// Asegúrate de llamar a agregarManejadorClicsNombres después de que la tabla haya sido creada y el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Suponiendo que tu función Crear_ListadoClientesPorEntrenador ya ha sido llamada en algún lugar y la tabla está lista
    agregarManejadorClicsNombres();
});

function mostrarInformacionCliente(clientId) {
    console.log("Mostrando información para el cliente ID:", clientId);
    // Redirect a una pagina para graficas
    document.location.href = "/Graficos/Index";

    
}




//function BuscarCliente() {
//    var nombreCliente = document.getElementById("txtNombreCliente").value;
//    $.get("Clientes/FiltrarClientes/?nombreCliente=" + nombreCliente, function (data) {
//        Crear_ListadoClientes(data);
//    })
//}