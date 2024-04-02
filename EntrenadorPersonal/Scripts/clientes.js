$.get("Clientes/GetClientes", function (data) {

    Crear_ListadoClientes(data);
})


function Crear_ListadoClientes(data) {

    var contenido = "";
    contenido += "<table id='tablaClientes'  class ='table'>";

    contenido += `
    <thead>
        <tr>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Email</th>
        <th>EntrenadorID</th>
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
                <tr>
            <td>${fila.Nombre}</td>
            <td>${fila.Apellido}</td>
            <td>${fila.Email}</td>
            <td>${fila.EntrenadorID}</td>
            <td>${fila.Telefono}</td>
            <td>${fila.FechaInicio}</td>
        </tr>
        `
    }
    contenido += "</tbody>";

    contenido += "</table>";

    document.getElementById("listadoClientes").innerHTML = contenido;
    $('#tablaClientes').DataTable({searching:false});
}

function BuscarCliente() {
    var nombreCliente = document.getElementById("txtNombreCliente").value;
    $.get("Clientes/FiltrarClientes/?nombreCliente=" + nombreCliente, function (data) {
        Crear_ListadoClientes(data);
    })
}