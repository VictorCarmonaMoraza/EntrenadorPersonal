
// Se define `datosGraficoGlobal` sin inicializarla aquí. Será inicializada después de recuperar los datos.
var datosGraficoGlobal;

// Array de propiedades que se mostrarán en el gráfico.
const dataPersona = ["Peso", "Grasa Corporal", "Musculo"];

$(document).ready(function () {
    // Recuperar la información del local storage
    var datosGrafico = localStorage.getItem('datosGrafico');
    //if (datosGrafico) {
    //    datosGraficoGlobal = JSON.parse(datosGrafico);
    //    // Una vez que los datos están disponibles, inicializar los gráficos.
    //    // Asume que `datosGraficoGlobal` tiene las propiedades `.Peso`, `.Grasa_Corporal` y `.Musculo` correctamente establecidas.
    //    let peso = [];
    //    let grasa = [];
    //    let musculo = [];
    //    for (let i = 0; i < datosGraficoGlobal.length; i++) {
    //        peso.push(datosGraficoGlobal[i].Peso);
    //        grasa.push(datosGraficoGlobal[i].Grasa_Corporal);
    //        musculo.push(datosGraficoGlobal[i].Musculo);
    //    }
    //    inicializarGraficosBarras('graficoIMC', dataPersona, datosGraficoGlobal[0]);
    //    document.getElementById("fechaIMC").innerHTML = datosGraficoGlobal[0].Fecha;
    //} else {
    //    console.error("No se encontraron datos de gráficos en el almacenamiento local.");
    //}
    if (datosGrafico) {
        datosGraficoGlobal = JSON.parse(datosGrafico);
        // No es necesario extraer los datos en arrays separados si vas a pasar todo el objeto a la función de inicialización del gráfico.
        inicializarGraficosBarras('graficoIMC', datosGraficoGlobal); // Pasamos el array completo.

        // Asumiendo que quieres mostrar la fecha del primer objeto en 'datosGraficoGlobal'.
        // También asegúrate de que la propiedad se llame 'Fecha' y no 'FechaInicio' como en funciones anteriores.
        if (datosGraficoGlobal.length > 0 && datosGraficoGlobal[0].Fecha) {
            document.getElementById("fechaIMC").innerHTML = datosGraficoGlobal[0].Fecha;
        }
    }
});
// Ajusta esta función para aceptar un ID de canvas como parámetro
function inicializarGraficosBarrasP(canvasId, dataPersona, datosGrafico) {

    if (!datosGraficoGlobal) {
        //console.error("Los datos del gráfico no están disponibles.");
        return;
    }
    const labels = datosGrafico['FechaInicio'];
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
            },
            {
                label: 'Musculo',
                data: [datosGrafico.Musculo],
                backgroundColor: [
                    'rgba(93, 19, 250, 0.8)',
                ],
                borderColor: [
                    'rgba(93, 19, 36, 1)',
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

// Esta variable mantendrá la referencia al gráfico existente, asumiendo que está en un scope accesible.
let currentChart = null;

function inicializarGraficosBarras(canvasId, datosGrafico) {
    // Verifica si los datos están disponibles
    if (!datosGrafico) {
        console.error("Los datos del gráfico no están disponibles.");
        return;
    }

    // Extrae las fechas para las etiquetas y los datos de cada categoría
    const labels = datosGrafico.map(item => item['FechaInicio']);
    const pesos = datosGrafico.map(item => item['Peso']);
    const grasas = datosGrafico.map(item => item['Grasa_Corporal']);
    const musculos = datosGrafico.map(item => item['Musculo']);

    // Configura los datos para Chart.js
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Peso',
                data: pesos,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            },
            {
                label: 'Grasa Corporal',
                data: grasas,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 1
            },
            {
                label: 'Musculo',
                data: musculos,
                backgroundColor: 'rgba(93, 19, 250, 0.8)',
                borderColor: 'rgba(93, 19, 36, 1)',
                borderWidth: 1
            }
        ]
    };

    // Configuración del gráfico
    const config = configuracionGraficaBarras(data);

    // Obtén el elemento canvas por ID
    const canvasBarra = document.getElementById(canvasId);
    if (canvasBarra) {
        // Si ya existe un gráfico en este canvas, lo destruye antes de crear uno nuevo
        if (currentChart != null) {
            currentChart.destroy();
        }

        // Crea el gráfico y guarda la referencia en currentChart
        currentChart = new Chart(canvasBarra, config);
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


