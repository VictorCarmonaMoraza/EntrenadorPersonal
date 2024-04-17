
// Se define `datosGraficoGlobal` sin inicializarla aquí. Será inicializada después de recuperar los datos.
var datosGraficoGlobal;

// Array de propiedades que se mostrarán en el gráfico.
const dataPersona = ["Peso", "Grasa Corporal", "Musculo"];

$(document).ready(function () {
    // Recuperar la información del local storage
    var datosGrafico = localStorage.getItem('datosGrafico');
    if (datosGrafico) {
        datosGraficoGlobal = JSON.parse(datosGrafico);
        // Una vez que los datos están disponibles, inicializar los gráficos.
        // Asume que `datosGraficoGlobal` tiene las propiedades `.Peso`, `.Grasa_Corporal` y `.Musculo` correctamente establecidas.
        let peso = [];
        let grasa = [];
        let musculo = [];
        for (let i = 0; i < datosGraficoGlobal.length; i++) {
            peso.push(datosGraficoGlobal[i].Peso);
            grasa.push(datosGraficoGlobal[i].Grasa_Corporal);
            musculo.push(datosGraficoGlobal[i].Musculo);
        }
        inicializarGraficosBarras('graficoIMC', dataPersona, datosGraficoGlobal[0]);
        document.getElementById("fechaIMC").innerHTML = datosGraficoGlobal[0].Fecha;
    } else {
        console.error("No se encontraron datos de gráficos en el almacenamiento local.");
    }
});
// Ajusta esta función para aceptar un ID de canvas como parámetro
function inicializarGraficosBarras(canvasId, dataPersona, datosGrafico) {

    if (!datosGraficoGlobal) {
        //console.error("Los datos del gráfico no están disponibles.");
        return;
    }
    const labels = dataPersona;
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Peso',
                data: [datosGrafico.Peso],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                ],
                borderWidth: 1
            },
            {
                label: 'Grasa_Corporal',
                data: [datosGrafico.Grasa_Corporal],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 159, 64)',
                ],
                borderWidth: 1
                }
        ],

    };
    const config = configuracionGraficaBarras(data);

    // Utiliza el ID para obtener el canvas específico
    const canvasBarra = document.getElementById(canvasId);
    if (canvasBarra) {
        // Solo intenta crear el gráfico si el elemento canvas fue encontrado
        new Chart(canvasBarra, config);
    } else {
        console.error('No se encontró el elemento canvas con el ID:', canvasId);
    }
}

function configuracionGraficaBarras(data) {
    return {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };
}

// Ejemplo de cómo llamar a la función
// Asegúrate de que este script se ejecute después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    inicializarGraficosBarras('graficoIMC',dataPersona); // Asegúrate de que el ID corresponda a un elemento canvas en tu HTML
});


