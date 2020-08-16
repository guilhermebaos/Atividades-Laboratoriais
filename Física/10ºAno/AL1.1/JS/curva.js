// Definir Constantes
const COF = 0.1 // Coeficiente de Fricção entre o carrinho e o plano
const g = 9.80665 // Aceleração Gravitaconal

// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F10_AL11 = {
    preparado: false,
    divCurva: ''
}

let massaCarrinho
let angPlanoInclinado
let forçaAtrito

let massaCarrinhoResp
let angPlanoInclinadoResp
let forçaAtritoResp


function prepararResultados() {
    if (F10_AL11.preparado) {
        return
    }
    F10_AL11.preparado = true
    
    // Selecionar Sliders
    massaCarrinho = document.getElementById('massaCarrinho')
    angPlanoInclinado = document.getElementById('angPlanoInclinado')
    forçaAtrito = document.getElementById('forçaAtrito')
    
    // Selecionar os Spans com os Value dos Sliders
    massaCarrinhoResp = document.getElementById('massaCarrinhoValue')
    angPlanoInclinadoResp = document.getElementById('angPlanoInclinadoValue')
    forçaAtritoResp = document.getElementById('forçaAtritoValue')
    
    // Selecionar a div onde vai parar a curva
    
    // Atualizar os Sliders
    massaCarrinho.oninput = function atualizarMassaCarrinho() {
        let massaCarrinhoValue = massaCarrinho.value * 10
    
        massaCarrinhoResp.innerHTML = `${massaCarrinhoValue.toFixed(0)}`

        atualizarAtritoMax()
    }
    angPlanoInclinado.oninput = function atualizarAngPlanoInclinado() {
        let angPlanoInclinadoValue = angPlanoInclinado.value / 10
    
        angPlanoInclinadoResp.innerHTML = `${angPlanoInclinadoValue.toFixed(1)}`

        atualizarAtritoMax()
    }
    forçaAtrito.oninput = function atualizarForçaAtrito() {
        let forçaAtritoValue = forçaAtrito.value / 1000
    
        forçaAtritoResp.innerHTML = `${forçaAtritoValue.toFixed(3)}`
    }
}


// Limitar a Força de Atrito Máxima Sentida pelo Carrinho
function atualizarAtritoMax() {
    let m = massaCarrinho.value / 100
    let theta = angPlanoInclinado.value / 10 * (Math.PI / 180)

    let Fnormal = m * g * Math.cos(theta) // A Força normal é igual à componente do peso perpendicular à superfície
    let FaMax = COF * Fnormal
    let FaMaxConvertido = Math.floor(FaMax * 1000)

    if (forçaAtrito.value > FaMaxConvertido) {
        forçaAtritoResp.innerHTML = `${(FaMaxConvertido / 1000).toFixed(3)}`
    }

    forçaAtrito.max = FaMaxConvertido
}