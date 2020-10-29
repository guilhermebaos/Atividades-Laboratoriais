// Definir Constantes

// As capacidades térmicas mássicas estão em J/Kg/ºC



// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F10_AL33 = {
    preparado: false,
    divCurva: ''
}


function prepararResultados() {
    if (F10_AL33.preparado) {
        return
    }
    
    // Selecionar Sliders

    // Selecionar os Spans com os Valores dos Sliders

    // Selecionar os Butões

    // Selecionar os spans com os Resultados da Tabela

    // Selecionar a div onde vai parar a curva

    // Atualizar os Sliders

    F10_AL33.preparado = true
    curva()
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