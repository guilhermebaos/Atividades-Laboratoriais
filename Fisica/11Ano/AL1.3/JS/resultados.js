// Definir Constantes
const g = 9.81      // Aceleração Gravitaconal

                 
// Obter o DPR do ecrã
const DPR = window.devicePixelRatio
   
// Constantes a passar para a Simulação
const RESOLUCAO = 15   
const CONSTANTES = {
    g: g
}


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F11_AL13 = {
    preparado: false
}

let massaCarrinho, massaCarrinhoResp
let posCarrinho, posCarrinhoResp
let angPlanoInclinado, angPlanoInclinadoResp
let larguraTira, larguraTiraResp
let forcaAtrito

let aTravagemResp, forcaAtritoTravagemResp

let canvasSim, ctx, simula
function prepararResultados() {
    if (F11_AL13.preparado) {
        return
    }
    
    // Selecionar Sliders
    massaCarrinho = document.getElementById('massaCarrinho')
    posCarrinho = document.getElementById('posCarrinho')
    angPlanoInclinado = document.getElementById('angPlanoInclinado')
    larguraTira = document.getElementById('larguraTira')
    forcaAtrito = document.getElementById('forcaAtrito')

    // Selecionar os Spans com os Valores dos Sliders
    massaCarrinhoResp = document.getElementById('massaCarrinhoValue')
    posCarrinhoResp = document.getElementById('posCarrinhoValue')
    angPlanoInclinadoResp = document.getElementById('angPlanoInclinadoValue')
    larguraTiraResp = document.getElementById('larguraTiraValue')

    // Selecionar os Spans com os Resultados da Tabela
    aTravagemResp = document.getElementById('aTravagemValue')
    forcaAtritoTravagemResp = document.getElementById('forcaAtritoTravagemValue')

    // Atualizar os Sliders
    massaCarrinho.oninput = () => {
        let massaCarrinhoValue = massaCarrinho.value / 1
    
        massaCarrinhoResp.innerText = `${massaCarrinhoValue.toFixed(0)}`

        reiniciar()
    }
    posCarrinho.oninput = () => {
        let posCarrinhoValue = posCarrinho.value / 10
    
        posCarrinhoResp.innerText = `${posCarrinhoValue.toFixed(1)}`

        reiniciar()
    }
    angPlanoInclinado.oninput = () => {
        let angPlanoInclinadoValue = angPlanoInclinado.value / 10
    
        angPlanoInclinadoResp.innerText = `${angPlanoInclinadoValue.toFixed(1)}`

        reiniciar()
    }
    larguraTira.oninput = () => {
        let larguraTiraValue = larguraTira.value / 10
    
        larguraTiraResp.innerText = `${larguraTiraValue.toFixed(1)}`

        reiniciar()
    }
    

    // SIMULAÇÂO
    
    // Selecionar o Canvas e o seu context
    canvasSim = document.getElementById('canvasSim')

    ctx = canvasSim.getContext('2d')

    ctx.scale(DPR, DPR)

    // Criar o Objeto Simula
    simula = new window.Simula(canvasSim, RESOLUCAO, CONSTANTES)

    F11_AL13.preparado = true
    loopSimula()
}


// Corrige o tamanho do Canvas e corrige o DPR
function fixDPR() {
    // Usar variável global
    if (simulaFQmenu.aberto !== 'resultados.html') return

    // Altura do CSS
    let altura_css = +getComputedStyle(canvasSim).getPropertyValue('height').slice(0, -2)
    // Larura do CSS
    let largura_css = +getComputedStyle(canvasSim).getPropertyValue('width').slice(0, -2)
    
    // Altera o tamanho do canvas
    canvasSim.width = largura_css * DPR
    canvasSim.height = altura_css * DPR

    canvasSim.style.height = altura_css + 'px'

    simula.novoTamanho()
}


// Reiniciar a Simulação
function reiniciar(start=false) {
    simula.reiniciar(start)
}


// Criar o loop da Simulação
let ultimoTempo, resultadosSim

function loopSimula(tempo) {
    if (ultimoTempo === undefined) {
        ultimoTempo = tempo
        fixDPR()
        requestAnimationFrame(loopSimula)
        reiniciar()
        return
    }

    let deltaTempo = (tempo - ultimoTempo) / 1000 / RESOLUCAO
    ultimoTempo = tempo
    
    for (let i = 0; i < RESOLUCAO; i++) {
        resultadosSim = simula.update(deltaTempo)
        if (resultadosSim){
            console.log(resultadosSim)
        }
    }

    ctx.clearRect(0, 0, canvasSim.width, canvasSim.height)
    simula.desenhar(ctx)

    requestAnimationFrame(loopSimula)
}

window.onresize = fixDPR