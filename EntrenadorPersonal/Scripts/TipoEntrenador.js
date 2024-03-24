$.get("Entrenadores/GetEntrenadores", function (data) {

    //Para mostrar la informacion en un alert debemos de JSON.stringify()
    //alert(JSON.stringify(data));

    Crear_ListadoEntrenadoresHabilitados(data);
})


function Crear_ListadoEntrenadoresHabilitados(data) {

    var contenido = "";
    contenido += "<table class ='table'>";
    //Las cabeceras
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<th>Nombre</th>";
    contenido += "<th>Apellidos</th>";
    contenido += "<th>Email</th>";
    contenido += "<th>Especialidad</th>";
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
        contenido += "<td>" + fila.Especialidad + "</td>";
        contenido += "<td>" + fila.Telefono + "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";

    contenido += "</table>";

    document.getElementById("tipoEntrenador").innerHTML = contenido;
}