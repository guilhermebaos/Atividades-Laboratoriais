// Definir Constantes


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F11_AL31 = {
    preparado: false,
    divCurva: '',
    processandoAnim: false
}


let fenomBtns
let fenomEscolhido = 0


function prepararResultados() {
    if (F11_AL31.preparado) {
        return
    }
    
    // Selecionar Sliders

    // Selecionar os Spans com os Valores dos Sliders

    // Selecionar os Spans com os Resultados da Tabela

    // Selecionar os Butões que permitem escolher o Procedimento
    fenomBtns = document.getElementsByName('Fenómenos')

    // Atualizar os Sliders

    F11_AL31.preparado = true
    curva()
}


// Esolher o fenómeno a estudar


// Escolher o Procedimento a seguir
function fenomeno(num) {
    if (num == fenomEscolhido) return
    else {
        if (F11_AL31.processandoAnim) return
        F11_AL31.processandoAnim = true

        fenomBtns[fenomEscolhido].className = 'escolha'
        fenomBtns[num].className = 'escolha-atual'

        mostrarExtra(`Fenómeno${fenomEscolhido}`)
        window.setTimeout(mostrarExtra, mostrarExtraTempo, `Fenómeno${num}`)
        window.setTimeout(function() {
            F11_AL31.processandoAnim = false
        }, mostrarExtraTempo * 2)

        fenomEscolhido = num
    }
}


// Calcula o caminho tomado pelo laser
function pontos() {
    return
}


// Calcula e mostra os Resultados da Tabela
function curva() {
    return
}