// Definir Constantes
const g = 9.80665   // Aceleração Gravitaconal


// Constantes para a Simulação
const RESOLUCAO = 15                        // Tamanho do deltaT em cada update


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F12_AL12 = {
    preparado: false,
    divCurva: ''
}


function prepararResultados() {
    if (F12_AL12.preparado) {
        return
    }


    // SIMULAÇÂO
    
    // Selecionar o Canvas e o seu context
    canvasSim = document.getElementById('canvasSim')

    ctx = canvasSim.getContext('2d')

    // Criar o Objeto Simula
    simula = new window.Simula(canvasSim, RESOLUCAO, alturaInicial.max)

    F12_AL12.preparado = true
    loopSimula()
}


// Corrige o tamanho do Canvas e corrige o DPI
function fixDPI() {
    // Usar variável global
    if (simulaFQmenu.aberto !== 'resultados.html') return

    // Obter o DPI do ecrã
    let DPI = window.devicePixelRatio

    // Altura do CSS
    let altura_css = +getComputedStyle(canvasCurva).getPropertyValue('height').slice(0, -2) - 70
    // Larura do CSS
    let largura_css = +getComputedStyle(canvasSim).getPropertyValue('width').slice(0, -2)

    // Altera o tamanho do canvas
    canvasSim.width = largura_css * DPI
    canvasSim.height = altura_css * DPI

    simula.novoTamanho()
}


// Reiniciar a Simulação
function reiniciar() {
    simula.reiniciar()
}


let canvasCurva

// Mostra os Valores Relacionados com a Queda da Esfera
function curva(t, x) {
    // Remover o Canvas antigo
    F12_AL12.divCurva.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurva')
    F12_AL12.divCurva.appendChild(canvasCurva)

    // Criar o Chart Object
    let graCurva = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: t,
            datasets: [{
                data: x,
                label: 'Altura da Bola',
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
                        labelString: 'Altura da Bola/ cm',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    },
                    ticks: {
                        max: 500,
                        min: 0
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
                        let value = Number(tooltipItem.value).toFixed(1)
    
                        return 'Posição: ' + value + 'cm'
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


// Criar o loop da Simulação
let ultimoTempo

function loopSimula(tempo) {
    if (ultimoTempo === undefined) {
        ultimoTempo = tempo
        fixDPI()
        requestAnimationFrame(loopSimula)
        return
    }

    let deltaTempo = tempo - ultimoTempo
    ultimoTempo = tempo
    
    let dados
    for (let i = 0; i < RESOLUCAO; i++) {
        dados = simula.update(deltaTempo)
    }

    ctx.clearRect(0, 0, canvasSim.width, canvasSim.height)
    simula.desenhar(ctx)

    requestAnimationFrame(loopSimula)
}

window.onresize = fixDPI
