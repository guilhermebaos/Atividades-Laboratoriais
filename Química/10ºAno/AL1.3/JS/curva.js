// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let Q10_AL13 = {
    preparado: false,
}

let metalArray
let metalEscolhidoPos = 0



function prepararResultados() {
    if (Q10_AL13.preparado) {
        return
    }
    Q10_AL13.preparado = true

    // Selecionar Sliders
    
    // Selecionar os Spans com os Valores dos Sliders

    // Selecionar os Butões
    metalArray = document.getElementsByName('metalPicnometria')

    // Selecionar os Spans com os Resultados da Tabela
    
    // Atualizar os Sliders
}


// Altera o Metal escolhido, bem como a aparência dos butões
function escolherMetal(pos) {

    metalArray[metalEscolhidoPos].className = 'escolha'
    metalArray[pos].className = 'escolha-atual'

    metalEscolhidoPos = pos

    curva()
}


// Mostra os Resultados na Tabela
function curva() {
    if (metalEscolhidoPos == '0') {
        salEscolhidoResp.innerText = 'Cloreto de Sódio'
        corChamaResp.innerText = 'Amarelo'
    } else if (metalEscolhidoPos == '1') {
        salEscolhidoResp.innerText = 'Cloreto de Cálcio'
        corChamaResp.innerText = 'Vermelho Claro'
    } else if (metalEscolhidoPos == '2') {
        salEscolhidoResp.innerText = 'Cloreto de Potássio'
        corChamaResp.innerText = 'Violeta'
    } else if (metalEscolhidoPos == '3') {
        salEscolhidoResp.innerText = 'Cloreto de Bário'
        corChamaResp.innerText = 'Verde'
    } else if (metalEscolhidoPos == '4') {
        salEscolhidoResp.innerText = 'Cloreto de Lítio'
        corChamaResp.innerText = 'Vermelho Escuro'
    } else if (metalEscolhidoPos == '5') {
        salEscolhidoResp.innerText = 'Cloreto de Cobre (II)'
        corChamaResp.innerText = 'Verde Claro'
    }
}