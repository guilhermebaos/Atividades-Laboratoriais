import Simula from '../JS/simula.js'


// Selecionar os Sliders
let massaPendulo = document.getElementById('massaPendulo')
let comprimentoFio = document.getElementById('comprimentoFio')
let angMax = document.getElementById('angMax')
let aGravitica = document.getElementById('aGravitica')

// Selecionar os Spans com os valores dos Sliders
let massaPenduloResp = document.getElementById('massaPenduloValue')
let comprimentoFioResp = document.getElementById('comprimentoFioValue')
let angMaxResp = document.getElementById('angMaxValue')
let aGraviticaResp = document.getElementById('aGraviticaValue')

// Atualizar os Sliders
massaPendulo.oninput = function atualizarmassaPendulo() {
    let massaPenduloValue = massaPendulo.value / 1000

    massaPenduloResp.innerText = `${massaPenduloValue.toFixed(3)}`
}
comprimentoFio.oninput = function atualizarcomprimentoFio() {
    let comprimentoFioValue = comprimentoFio.value / 100

    comprimentoFioResp.innerText = `${comprimentoFioValue.toFixed(2)}`
}
angMax.oninput = function atualizaraGravitica() {
    let angMaxValue = angMax.value / 10

    angMaxResp.innerText = `${angMaxValue.toFixed(1)}`
}
aGravitica.oninput = function atualizaraGravitica() {
    let aGraviticaValue = aGravitica.value / 100

    aGraviticaResp.innerText = `${aGraviticaValue.toFixed(2)}`
}



// Selecionar o Canvas e o seu context
let canvasPendulo = document.getElementById('canvasPendulo')

let ctx = canvasPendulo.getContext('2d')


// Dimensões do Canvas
let LARGURA_SIM = canvasPendulo.width
let ALTURA_SIM = canvasPendulo.height

function novoTamanho() {
    LARGURA_SIM = canvasPendulo.width
    ALTURA_SIM = canvasPendulo.height
}

window.onresize = novoTamanho


// Criar o Objeto Simula
let simula = new Simula(LARGURA_SIM, ALTURA_SIM)


// Criar o loop da Simulação
let ultimoTempo = 0

function loopSimula(tempo) {
    let deltaTempo = tempo - ultimoTempo
    ultimoTempo = tempo

    ctx.clearRect(0, 0, LARGURA_SIM, ALTURA_SIM)

    simula.update(deltaTempo)
    simula.desenhar(ctx)

    requestAnimationFrame(loopSimula)
}

requestAnimationFrame(loopSimula)
