$.get("Clientes/GetClientes", function (data) {

    //Para mostrar la informacion en un alert debemos de JSON.stringify()
    //alert(JSON.stringify(data));

    Crear_ListadoClientes(data);
})


function Crear_ListadoClientes(data) {

    var contenido = "";
    contenido += "<table id='tablaClientes'  class ='table'>";
    //Las cabeceras
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<th>Nombre</th>";
    contenido += "<th>Apellidos</th>";
    contenido += "<th>Email</th>";
    contenido += "<th>EntrenadorID</th>";
    contenido += "<th>Telefono</th>";
    contenido += "</tr>";
    contenido += "</thead>";
    //Contenido
    contenido += "<tbody class='table-group-divider'>";

    var fila;
    for (var i = 0; i < data.length; i++) {
        fila = data[i];
        contenido += "<tr>";
        contenido += "<td>" + fila.Nombre + "</td>";
        contenido += "<td>" + fila.Apellido + "</td>";
        contenido += "<td>" + fila.Email + "</td>";
        contenido += "<td>" + fila.EntrenadorID + "</td>";
        contenido += "<td>" + fila.Telefono + "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";

    contenido += "</table>";

    document.getElementById("listadoClientes").innerHTML = contenido;
    $('#tablaClientes').DataTable();
}