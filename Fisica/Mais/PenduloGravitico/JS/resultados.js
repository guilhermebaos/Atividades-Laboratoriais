import Simula from '../JS/simula.js'


// INPUTS

// Selecionar os Sliders
let massaPendulo = document.getElementById('massaPendulo')
let comprimentoFio = document.getElementById('comprimentoFio')
let aGravitica = document.getElementById('aGravitica')
let angMax = document.getElementById('angMax')

// Selecionar os Spans com os valores dos Sliders
let massaPenduloResp = document.getElementById('massaPenduloValue')
let comprimentoFioResp = document.getElementById('comprimentoFioValue')
let aGraviticaResp = document.getElementById('aGraviticaValue')
let angMaxResp = document.getElementById('angMaxValue')

// Atualizar os Sliders
massaPendulo.oninput = function atualizarmassaPendulo() {
    let massaPenduloValue = massaPendulo.value / 1000

    massaPenduloResp.innerText = `${massaPenduloValue.toFixed(3)}`
}
comprimentoFio.oninput = function atualizarcomprimentoFio() {
    let comprimentoFioValue = comprimentoFio.value / 100

    comprimentoFioResp.innerText = `${comprimentoFioValue.toFixed(2)}`
}
aGravitica.oninput = function atualizaraGravitica() {
    let aGraviticaValue = aGravitica.value / 100

    aGraviticaResp.innerText = `${aGraviticaValue.toFixed(2)}`
}
angMax.oninput = function atualizaraGravitica() {
    let angMaxValue = angMax.value / 10

    angMaxResp.innerText = `${angMaxValue.toFixed(1)}`
}

// Selecionar as divs com os Gráficos
let divCurvaAng = document.getElementById('curvaAng')
let divCurvaPos = document.getElementById('curvaPos')
let divCurvaVel = document.getElementById('curvaVel')
let divCurvaAce = document.getElementById('curvaAce')
let divCurvaJer = document.getElementById('curvaJer')

let mostrarGraficos = false


// SIMULAÇÂO

// Selecionar o Canvas e o seu context
let canvasPendulo = document.getElementById('canvasPendulo')

let ctx = canvasPendulo.getContext('2d')




// Obter o DPI do ecrã
let DPI = window.devicePixelRatio


// Dimensões do Canvas
fixDPI()

function fixDPI() {
    // Altura do CSS
    let altura_css = +getComputedStyle(canvasPendulo).getPropertyValue("height").slice(0, -2)
    // Larura do CSS
    let largura_css = +getComputedStyle(canvasPendulo).getPropertyValue("width").slice(0, -2)

    // Altera o tamanho do canvas
    canvasPendulo.setAttribute('width', largura_css * DPI)
    canvasPendulo.setAttribute('height', altura_css * DPI)
}


// Constantes para a Simulação
const RESOLUCAO = 5                 // Tamanho do deltaT em cada update
const UPDATES_POR_FRAME = 5         // Velocidade da Simulação

// Criar o Objeto Simula
let simula = new Simula(canvasPendulo, RESOLUCAO, UPDATES_POR_FRAME)


// Criar o loop da Simulação
let ultimoTempo = performance.now()

function loopSimula(tempo) {
    let deltaTempo = tempo - ultimoTempo
    ultimoTempo = tempo

    ctx.clearRect(0, 0, canvasPendulo.width, canvasPendulo.height)
    
    for (let i = 0; i < UPDATES_POR_FRAME * RESOLUCAO; i++) {
        let dados = simula.update(deltaTempo)
        if (dados) {
            mostrarExtra('recolherDados')
            mostrarExtra('verGráficos')
            graficos(dados)
            mostrarGraficos = true
        }
    }
    simula.desenhar(ctx)

    requestAnimationFrame(loopSimula)
}

requestAnimationFrame(loopSimula)


document.getElementById('reiniciar-Simulação').addEventListener('click', (() => {
    if (mostrarGraficos) {
        mostrarExtra('recolherDados')
        mostrarExtra('verGráficos')
        mostrarGraficos = false
    }
    simula.reiniciar()
}))

window.onresize = simula.novoTamanho()


// GRÁFICOS
function graficos(dados) {
    let tempo = dados.tempo


    // GRÁFICO DO ÂNGULO

    // Remover o Canvas antigo
    divCurvaAng.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    let canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurvaAng')
    divCurvaAng.appendChild(canvasCurva)

    // Criar o Chart Object
    let graCurva = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: tempo,
            datasets: [{
                data: dados.ang,
                label: 'Ângulo com a Vertical',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
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
                        labelString: 'Ângulo com a Vertical/ º',
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


    // GRÁFICO DA POSIÇÃO

    // Remover o Canvas antigo
    divCurvaPos.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurvaPos')
    divCurvaPos.appendChild(canvasCurva)

    // Criar o Chart Object
    graCurva = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: tempo,
            datasets: [{
                data: dados.posX,
                label: 'Posição no eixo dos X',
                borderColor: 'red',
                fill: false
            },{
                data: dados.posY,
                label: 'Posição no eixo dos Y',
                borderColor: 'green',
                fill: false
            },{
                data: dados.pos,
                label: 'Módulo da Posição',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
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
                        labelString: 'Posição/ cm',
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
                        return data.datasets[0].label + ': ' + value + 'm'
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
    graCurva = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: tempo,
            datasets: [{
                data: dados.velX,
                label: 'Velocidade no eixo dos X',
                borderColor: 'red',
                fill: false
            },{
                data: dados.velY,
                label: 'Velocidade no eixo dos Y',
                borderColor: 'green',
                fill: false
            },{
                data: dados.vel,
                label: 'Módulo da Velocidade',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
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
                        return data.datasets[0].label + ': ' + value + 'm/s'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })


    // GRÁFICO DA ACELERAÇÃO

    // Remover o Canvas antigo
    divCurvaAce.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurvaAce')
    divCurvaAce.appendChild(canvasCurva)

    // Criar o Chart Object
    graCurva = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: tempo,
            datasets: [{
                data: dados.aceX,
                label: 'Aceleração no eixo dos X',
                borderColor: 'red',
                fill: false
            },{
                data: dados.aceY,
                label: 'Aceleração no eixo dos Y',
                borderColor: 'green',
                fill: false
            },{
                data: dados.ace,
                label: 'Módulo da Aceleração',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
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
                        labelString: 'Aceleração/ m/s²',
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
                        return data.datasets[0].label + ': ' + value + 'm/s²'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })


    // GRÁFICO DO JERK

    // Remover o Canvas antigo
    divCurvaJer.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurvaJer')
    divCurvaJer.appendChild(canvasCurva)

    // Criar o Chart Object
    graCurva = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: tempo,
            datasets: [{
                data: dados.jer,
                label: 'Módulo do Jerk',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
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
                        labelString: 'Jerk/ m/s²/s',
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
                        return data.datasets[0].label + ': ' + value + 'm/s²/s'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })
}
