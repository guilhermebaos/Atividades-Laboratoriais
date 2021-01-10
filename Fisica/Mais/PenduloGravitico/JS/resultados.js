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
let recolherDados = document.getElementById('recolherDados')
let verGraficos = document.getElementById('verGráficos')

let divCurvaAng = document.getElementById('curvaAng')


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


// Criar o Objeto Simula
let simula = new Simula(canvasPendulo)


// Criar o loop da Simulação
let ultimoTempo = 0

function loopSimula(tempo) {
    let deltaTempo = tempo - ultimoTempo
    ultimoTempo = tempo

    ctx.clearRect(0, 0, canvasPendulo.width, canvasPendulo.height)

    let dados = simula.update(deltaTempo)
    if (dados) {
        mostrarExtra('recolherDados')
        mostrarExtra('verGráficos')
        graficos(dados)
    }
    simula.desenhar(ctx)

    requestAnimationFrame(loopSimula)
}

requestAnimationFrame(loopSimula)


document.getElementById('reiniciar-Simulação').addEventListener('click', (() => {
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
    
                        return 'Ângulo ' + value + 'º'
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
