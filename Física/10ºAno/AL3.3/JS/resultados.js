// Definir Constantes

// As capacidades térmicas mássicas estão em J/Kg/ºC



// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F10_AL33 = {
    preparado: false,
    divCurva: ''
}

let massaQuente
let tempQuente
let massaFria
let tempFria
let massaGelo

let massaQuenteResp
let tempQuenteResp
let massaFriaResp
let tempFriaResp
let massaGeloResp

let escolhasMistura
let misturaEscolhida = 0


function prepararResultados() {
    if (F10_AL33.preparado) {
        return
    }
    
    // Selecionar Sliders
    massaQuente = document.getElementById('massaQuente')
    tempQuente = document.getElementById('tempQuente')
    massaFria = document.getElementById('massaFria')
    tempFria = document.getElementById('tempFria')
    massaGelo = document.getElementById('massaGelo')

    // Selecionar os Spans com os Valores dos Sliders
    massaQuenteResp = document.getElementById('massaQuenteValue')
    tempQuenteResp = document.getElementById('tempQuenteValue')
    massaFriaResp = document.getElementById('massaFriaValue')
    tempFriaResp = document.getElementById('tempFriaValue')
    massaGeloResp = document.getElementById('massaGeloValue')

    // Selecionar os Butões
    escolhasMistura = document.getElementsByName('escolhaMistura')

    // Selecionar os spans com os Resultados da Tabela

    // Selecionar a div onde vai parar a curva

    // Atualizar os Sliders
    massaQuente.oninput = function atualizarMassaQuente() {
        let massaQuenteValue = massaQuente.value / 10
    
        massaQuenteResp.innerText = `${massaQuenteValue.toFixed(1)}`
    }
    tempQuente.oninput = function atualizarTempQuente() {
        let tempQuenteValue = tempQuente.value / 10
    
        tempQuenteResp.innerText = `${tempQuenteValue.toFixed(1)}`
    }
    massaFria.oninput = function atualizarMassaFria() {
        let massaFriaValue = massaFria.value / 10
    
        massaFriaResp.innerText = `${massaFriaValue.toFixed(1)}`
    }
    tempFria.oninput = function atualizarTempFria() {
        let tempFriaValue = tempFria.value / 10
    
        tempFriaResp.innerText = `${tempFriaValue.toFixed(1)}`
    }
    massaGelo.oninput = function atualizarMassaGelo() {
        let massaGeloValue = massaGelo.value / 10
    
        massaGeloResp.innerText = `${massaGeloValue.toFixed(1)}`
    }

    F10_AL33.preparado = true
    curva()
}


// Selecionar o que vai ser misturado e alterar a aparência dos Butões
function escolherMistura(num) {
    if (num != misturaEscolhida) {
        // Desselecionar escolha anterior
        mostrarExtra(`mistura${misturaEscolhida}`)
        escolhasMistura[misturaEscolhida].className = 'escolha'

        // Selecinar Nova Escolha
        misturaEscolhida = num
        mostrarExtra(`mistura${misturaEscolhida}`)
        escolhasMistura[misturaEscolhida].className = 'escolha-atual'
    }
}


// Calcular os Pontos do Gráfico 
function pontos() {
    // Definir os valores para a simulação
    return
}



// Mostra o Gráfico relacionado com o bloco calorimétrico
function curva() {
    // Remover o Canvas antigo
    F10_AL33.divCurva.innerHTML = ''

    // Obter e guardar os resultados

    // Criar o canvas onde vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurva')
    F10_AL33.divCurva.appendChild(canvasCurva)

    // Criar o Chart Object
}


// Ideia: Permitir dissipação de energia