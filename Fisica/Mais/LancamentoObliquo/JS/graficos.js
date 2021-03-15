// GRÁFICOS
function criarGraficos(divsCurvas) {
    let divCurvaAng = divsCurvas[0]
    let divCurvaPos = divsCurvas[1]
    let divCurvaVel = divsCurvas[2]
    let divCurvaEne = divsCurvas[3]


    // GRÁFICO DO ÂNGULO

    // Remover o Canvas antigo
    divCurvaAng.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    let canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurvaAng')
    divCurvaAng.appendChild(canvasCurva)

    // Criar o Chart Object
    let graCurvaAng = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
                label: 'Ângulo entre a Velocidade e a Horizontal',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tempo/ s',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Ângulo entre a Velocidade e a Horizontal/ º',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    },
                    ticks: {
                        max: 90,
                        min: -90
                    }
                }]
            },
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItems, data) {
                        let tooltipItem = tooltipItems[0]

                        return 'Tempo: ' + tooltipItem.label + 's'
                    },
                    label: function(tooltipItem, data) {
                        let value = Number(tooltipItem.value).toFixed(3)
    
                        return 'Ângulo: ' + value + 'º'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })


    // GRÁFICO DA ENERGIA

    // Remover o Canvas antigo
    divCurvaEne.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurvaEne')
    divCurvaEne.appendChild(canvasCurva)

    // Criar o Chart Object
    let graCurvaEne = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
                label: 'Energia Cinética',
                borderColor: 'red',
                fill: false
            },{
                data: [],
                label: 'Energia Potencial Gravítica',
                borderColor: 'green',
                fill: false
            },{
                data: [],
                label: 'Energia Mecânica',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tempo/ s',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Energia/ J',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItems, data) {
                        let tooltipItem = tooltipItems[0]

                        return 'Tempo: ' + tooltipItem.label + 's'
                    },
                    label: function(tooltipItem, data) {
                        let value = Number(tooltipItem.value).toFixed(2)
                        
                        // Label variável
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + value + 'J'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })


    // GRÁFICO DA POSIÇÃO

    // Remover o Canvas antigo
    divCurvaPos.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurvaPos')
    divCurvaPos.appendChild(canvasCurva)

    // Criar o Chart Object
    let graCurvaPos = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
                label: 'Posição no eixo dos X',
                borderColor: 'red',
                fill: false
            },{
                data: [],
                label: 'Posição no eixo dos Y',
                borderColor: 'green',
                fill: false
            }]
        },
        options: {
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tempo/ s',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Posição/ m',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItems, data) {
                        let tooltipItem = tooltipItems[0]

                        return 'Tempo: ' + tooltipItem.label + 's'
                    },
                    label: function(tooltipItem, data) {
                        let value = Number(tooltipItem.value).toFixed(2)
                        
                        // Label variável
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + value + 'm'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })


    // GRÁFICO DA VELOCIDADE

    // Remover o Canvas antigo
    divCurvaVel.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurvaVel')
    divCurvaVel.appendChild(canvasCurva)

    // Criar o Chart Object
    let graCurvaVel = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
                label: 'Velocidade no eixo dos X',
                borderColor: 'red',
                fill: false
            },{
                data: [],
                label: 'Velocidade no eixo dos Y',
                borderColor: 'green',
                fill: false
            },{
                data: [],
                label: 'Módulo da Velocidade',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tempo/ s',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Velocidade/ m/s',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItems, data) {
                        let tooltipItem = tooltipItems[0]

                        return 'Tempo: ' + tooltipItem.label + 's'
                    },
                    label: function(tooltipItem, data) {
                        let value = Number(tooltipItem.value).toFixed(2)
                        
                        // Label variável
                        return  data.datasets[tooltipItem.datasetIndex].label + ': ' + value + 'm/s'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })

    return [graCurvaAng, graCurvaEne, graCurvaPos, graCurvaVel]
}


// Atualizar os gráficos
function atualizarGraficos(graficos, label, data) {
    graficos.forEach((grafico) => {
        grafico.data.labels.push(label)
        grafico.data.datasets.forEach((dataset) => {
            let d = data.shift()
            dataset.data.push(d)
        })
        grafico.update()
    })
}

export {criarGraficos, atualizarGraficos}