// Definir Constantes

// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F11_AL31 = {
    preparado: false,
    divCurva: '',
}


function prepararResultados() {
    if (F11_AL31.preparado) {
        return
    }
    
    // Selecionar Sliders

    // Selecionar os Spans com os Valores dos Sliders

    // Selecionar os Spans com os Resultados da Tabela

    // Selecionar a div que vai ter a Curva

    // Atualizar os Sliders

    F11_AL31.preparado = true
    curva()
}// Calcula o caminho tomado pelo laser
function pontos() {
    return
}


// Calcula e mostra os Resultados da Tabela
function curva() {
    // Remover o Canvas antigo
    F11_AL31.divCurva.innerHTML = ''

    // Criar o canvas onde vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurva')
    F11_AL31.divCurva.appendChild(canvasCurva)

    // Obter e guardar os resultados
    let resultados = pontos()
    let x = resultados[0]
    let y = resultados[1]
}

// Ideia: Ângulo Crítico na Refração
