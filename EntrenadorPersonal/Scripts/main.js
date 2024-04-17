﻿$(document).ready(function () {
    // Código que quieres ejecutar una vez que el DOM esté listo
    GetClientesPorEntrenador();
    $("#mostrarFormulario").click(function () {
        $("#formularioCrearCliente").show(); // Mostrar el formulario al hacer clic en el botón
    });
});

//$(document).ready(function () {
//    $("#mostrarFormulario").click(function () {
//        $("#formularioCrearCliente").show(); // Mostrar el formulario al hacer clic en el botón
//    });
//});

function GetClientesPorEntrenador() {
     let entrenador = document.getElementById("idEntrenador").value;
    $.get("GetClientesPorEntrenador/?entrenadorId=" + parseInt(entrenador), function (data) {
        Crear_ListadoClientesPorEntrenador(data);
        console.log(data);
    })
}

//function Crear_ListadoClientesPorEntrenador(data) {

//    var contenido = "";
//    contenido += "<table id='tablaClientes'  class ='table'>";

//    contenido += `
//    <thead>
//        <tr>
//        <th>Nombre</th>
//        <th>Apellidos</th>
//        <th>Email</th>
//        <th>Telefono</th>
//        <th>Fecha de inicio</th>
//        <th>Acciones</th>
//        </tr>
//     </thead>
//`;
//    /*contenido += "<tbody class='table-group-divider' style='overflow-y: auto; height: 300px;'>";*/
//    contenido += "<tbody class='table-group-divider' style='overflow-y: auto; height: 100px;'>";
//    var fila;
//    for (var i = 0; i < data.length; i++) {
//        fila = data[i];
//        contenido += `
//                <tr data-client-id="${fila.ClienteID}">
//            <td><span class="clickeableNombre" data-client-id="${fila.ClienteID}">${fila.Nombre}</span></td>
//            <td>${fila.Apellido}</td>
//            <td>${fila.Email}</td>
//            <td>${fila.Telefono}</td>
//            <td>${fila.FechaInicio}</td>
//            <td>
//            <i onclick="abrirModalPersonas(${fila.ClienteID})"  data-toggle="modal" class= 'btn btn-primary fas fa-edit'></i>
//            <i onclick ='eliminarPersona(${fila.ClienteID})' class="btn btn-danger fas fa-trash"></i>
//            <td>
//        </tr>
//        `
//    }
//    contenido += "</tbody>";

//    contenido += "</table>";

//    document.getElementById("listadoClientesPorEntrenador").innerHTML = contenido;
//    $('#tablaClientes').DataTable({ searching: false });

//}

function Crear_ListadoClientesPorEntrenador(data) {
    var contenido = "";
    contenido += "<table id='tablaClientes' class='table'>";

    contenido += `
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Fecha de inicio</th>
            <th>Acciones</th>
        </tr>
    </thead>
    `;
    // Nota: La propiedad overflow-y debe aplicarse al contenedor de la tabla, no al tbody, para que funcione correctamente.
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
                    <td>
                        <i onclick="addEvolucionCliente(${fila.ClienteID})" data-bs-toggle="modal" data-bs-target="#exampleModal" class='btn btn-primary fas fa-edit'></i>
                        <i onclick='eliminarPersona(${fila.ClienteID})' class="btn btn-danger fas fa-trash"></i>
                    </td>
                </tr>
        `;
    }
    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("listadoClientesPorEntrenador").innerHTML = contenido;
    // Asegurarse de que DataTables se inicializa después de que el contenido esté completamente cargado.
    $(document).ready(function () {
        $('#tablaClientes').DataTable({ searching: false });
    });
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
    cargarDatosGrafica(clientId);
}

function cargarDatosGrafica(clienteIdSeleccionado) {
    var clienteId = parseInt(clienteIdSeleccionado);
    $.ajax({
        url: '/Graficos/GetGraficaPorCliente',
        type: 'GET',
        dataType: 'json',
        data: { clienteId: clienteId },
        success: function (data) {
            console.log(data);
            localStorage.setItem('datosGrafico', JSON.stringify(data));
            document.location.href = "/Graficos/Index"
            
        },
        error: function (xhr, status, error) {
            console.error("Error al recuperar datos: ", error);
        }
    });
}

//Crear un cliente nuevo
function CrearCliente() {
    var idEntrenador = document.getElementById('idEntrenador').value;
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var email = document.getElementById("txtEmail").value;
    var telefono = document.getElementById("txtTelefono").value;
    var fechaInicio = document.getElementById("txtFechaInicio").value;

    var frmData = new FormData();
    frmData.append("entrenadorID", idEntrenador);
    frmData.append("nombre", nombre);
    frmData.append("apellido", apellido);
    frmData.append("email", email);
    frmData.append("telefono", telefono);
    frmData.append("fechaInicio", fechaInicio);
    console.log(frmData);
    $.ajax({
        type: "POST",
        url: "/Clientes/CrearCliente",
        data: frmData,
        contentType: false,
        processData: false,

        success: function (data) {
            if (data.success == 1) {
                //Refrescamos tabla de clientes
                GetClientesPorEntrenador();
                limpiarCampos();
                cerrarFormulario();
            }
            else {
                alert("El usuario no se creo");
                //llamarSweetAlertOK(nombre, 1)
            }
        }
    })
}

//Limpiar campos del formulario
function limpiarCampos() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtFechaInicio").value = "";
}

function limpiarCamposEvolucion() {
    var elementosConClaseLimpiar = document.getElementsByClassName("limpiar");
    var nelementos = elementosConClaseLimpiar.length;
    for (var i = 0; i < nelementos; i++) {
        elementosConClaseLimpiar[i].value = "";
    }
}

//Cerrar Formulario
function cerrarFormulario() {
    $("#formularioCrearCliente").hide();
}

function addEvolucionCliente(idFront) {
    //Inserrtamos titluo del modal
    //document.getElementById("evolucionCliente").innerHTML = "Agregando Evolución Cliente"
    ////Recupero todos los campos del formulario
    //var idCliente = idFront;
    //var fecha = document.getElementById("txtFecha").value;
    //var grasa_corporal = document.getElementById("txtGrasaCorporal").value;
    //var musculo = document.getElementById("txtMusculo").value;
    //var comentario = document.getElementById("txtComentario").value;


    //Hacemos el modal visible

    alert(idFront);
    //limpiarModalPersona();
    ////Si el id viene vacio es que estamos agregando un elemento a la base de datos
    ////Si el id viene vacio(o undefined) con datos es que vamos a hacer una edicion
    //if (idFront != undefined) {
    //    document.getElementById("tituloModalPersona").innerHTML = "Editando Persona"
    //    $.get("Personas/recuperarInformacionPersona/?idPersona=" + idFront, function (respuestaServidor) {
    //        document.getElementById("txtIdPersona").value = respuestaServidor[0].IIDPERSONA;
    //        document.getElementById("txtNombre").value = respuestaServidor[0].NOMBRE;
    //        document.getElementById("txtApPaterno").value = respuestaServidor[0].APPATERNO;
    //        document.getElementById("txtApMaterno").value = respuestaServidor[0].APMATERNO;
    //        document.getElementById("txtTelefono").value = respuestaServidor[0].TELEFONO;
    //        document.getElementById("txtEmail").value = respuestaServidor[0].CORREO;
    //        document.getElementById("txtFechaNacimiento").value = respuestaServidor[0].FECHANACIMIENTO;
    //        document.getElementById("comboSexoPersonasFormulario").value = respuestaServidor[0].IIDSEXO;
    //    })
    //} else {
    //    document.getElementById("tituloModalPersona").innerHTML = "Agregando  Persona"
    //}
}

function eliminarPersona(idPersonaFront) {
    //if (confirm("Desea eliminar realmente esta persona") == 1) {
    //    alert(idPersonaFront);
    //    //$.get("Nombre_Controlador/Funcion_del_Controlador/?_Parametro="+vlor_de_ la_caja_de_texto);
    //    $.get("Personas/eliminarPersona/?id=" + idPersonaFront, function (data) {
    //        if (data == 0) {
    //            alert("Ocurrio un error");
    //        }
    //        else {
    //            alert("Se elimino la persona correctamente");
    //            listar();
    //            document.getElementById("btnCerrar").click();
    //        }
    //    });
    //}

}

function GuardarEvolucion() {
    //Obtenemos todos los valores de los campos
    /*var idCliente = document.getElementById("txtIdCliente").value;*/
    var peso = document.getElementById('txtPeso').value;
    var grasaCorporal = document.getElementById('txtGrasaCorporal').value;
    var comentario = document.getElementById('txtComentario').value;
    var musculo = document.getElementById('txtMusculo').value;
    var fechaEvolucion = document.getElementById('txtFechaEvolucion').value;
}

function GuardarPersona() {

}
