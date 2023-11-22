
function initializeChart() {
    const ctx = document.getElementById('simulationCanvas').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (window.virusSpreadChart) {
        window.virusSpreadChart.destroy();
    }

    window.virusSpreadChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Computadoras Infectadas',
                data: [],
                fill: false,
                borderColor: 'blue',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Tiempo (Horas)'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Computadoras Infectadas'
                    }
                }
            }
        }
    });
}

function startSimulation() {
    const Q0 = parseInt(document.getElementById('initialCount').value, 10);
    const totalTime = parseInt(document.getElementById('simulationTime').value, 10);
    const K = 0.2;

    let dataPoints = [];
    for (let t = 0; t <= totalTime; t++) {
        const Q = Q0 * Math.exp(K * t);
        dataPoints.push({ x: t, y: Q });
    }

    window.virusSpreadChart.data.labels = dataPoints.map(dp => dp.x);
    window.virusSpreadChart.data.datasets[0].data = dataPoints;
    window.virusSpreadChart.update();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
});

