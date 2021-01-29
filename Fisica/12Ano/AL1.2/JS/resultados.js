// Definir Constantes
const g = 9.80665   // Aceleração Gravitaconal


// Constantes para a Simulação
const RESOLUCAO = 15                        // Tamanho do deltaT em cada update


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F12_AL12 = {
    preparado: false,
    divCurva: '',
    processandoAnim: false
}

let massaBloco
let coefAtritoEstatico
let coefAtritoCinetico
let intForca
let massaAreia

let massaBlocoResp
let intForcaResp
let massaAreiaResp

let montagemBtns


function prepararResultados() {
    if (F12_AL12.preparado) {
        return
    }

    // Selecionar Sliders
    massaBloco = document.getElementById('massaBloco')
    coefAtritoEstatico = document.getElementById('coefAtritoEstatico')
    coefAtritoCinetico = document.getElementById('coefAtritoCinetico')
    intForca = document.getElementById('intForca')
    massaAreia = document.getElementById('massaAreia')

    // Selecionar os Spans com os Valores dos Sliders
    massaBlocoResp = document.getElementById('massaBlocoValue')
    intForcaResp = document.getElementById('intForcaValue')
    massaAreiaResp = document.getElementById('massaAreiaValue')

    // Selecionar a div que vai ter a Curva

    // Selecionar os Butões que permitem escolher o Procedimento
    montagemBtns = document.getElementsByName('montagens')

    // F12_AL12.divCurva = document.getElementById('curva-vt')

    // Atualizar os Sliders
    massaBloco.oninput = function atualizarMassaBloco() {
        let massaBlocoValue = massaBloco.value / 1
    
        massaBlocoResp.innerText = `${massaBlocoValue.toFixed(0)}`
    }
    intForca.oninput = function atualizarIntForca() {
        let intForcaValue = intForca.value / 100
    
        intForcaResp.innerText = `${intForcaValue.toFixed(2)}`
    }
    massaAreia.oninput = function atualizarMassaAreia() {
        let massaAreiaValue = massaAreia.value / 1
    
        massaAreiaResp.innerText = `${massaAreiaValue.toFixed(0)}`
    }
    
    // SIMULAÇÂO
    
    // Selecionar o Canvas e o seu context
    canvasSim = document.getElementById('canvasSim')

    ctx = canvasSim.getContext('2d')

    // Criar o Objeto Simula
    simula = new window.Simula(canvasSim, RESOLUCAO, {
        intForca: intForca,
        massaAreia: massaAreia
    })

    F12_AL12.preparado = true
    loopSimula()
}

let montagemEscolhida = 0

// Esolher a montagem a estudar
function montagem(num) {
    if (num == montagemEscolhida) return
    else {
        if (F12_AL12.processandoAnim) return
        F12_AL12.processandoAnim = true

        montagemBtns[montagemEscolhida].className = 'escolha'
        montagemBtns[num].className = 'escolha-atual'

        // Esconder e mostrar a opção selecionada
        mostrarExtra(`Montagem${montagemEscolhida}`)
        window.setTimeout(mostrarExtra, mostrarExtraTempo, `Montagem${num}`)
        window.setTimeout(function() {
            F12_AL12.processandoAnim = false
        }, mostrarExtraTempo * 2)

        montagemEscolhida = num
    }
}


// Corrige o tamanho do Canvas e corrige o DPI
function fixDPI() {
    // Usar variável global
    if (simulaFQmenu.aberto !== 'resultados.html') return

    // Obter o DPI do ecrã
    let DPI = window.devicePixelRatio

    // Altura do CSS
    let altura_css = +getComputedStyle(canvasSim).getPropertyValue('height').slice(0, -2)
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


// Mostra os Valores Relacionados com a Queda da Esfera
function curva(t, v) {
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
                data: v,
                label: 'Velocidade do Bloco',
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
                        labelString: 'Velocidade do Bloco/ m/s',
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
    
                        return 'Velocidade: ' + value + 'm/s'
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
    if (dados) {
        curva(dados.t, dados.v)
    }

    ctx.clearRect(0, 0, canvasSim.width, canvasSim.height)
    simula.desenhar(ctx)

    requestAnimationFrame(loopSimula)
}

window.onresize = fixDPI
