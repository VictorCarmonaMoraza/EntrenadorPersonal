

// Ajusta esta función para aceptar un ID de canvas como parámetro
function inicializarGraficosBarras(canvasId) {
    const labels = ["Victor", "Juan", "Pedro", "X", "Y", "Z", "O"];
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
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
    inicializarGraficosBarras('graficoIMC'); // Asegúrate de que el ID corresponda a un elemento canvas en tu HTML
});


