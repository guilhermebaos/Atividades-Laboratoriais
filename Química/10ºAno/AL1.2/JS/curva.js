// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let Q10_AL12 = {
    preparado: false,
}

let salArray
let salEscolhidoPos = 0
let salEscolhidoNome = 'NaCl'

let salEscolhidoResp
let corChamaResp


function prepararResultados() {
    if (Q10_AL12.preparado) {
        return
    }
    Q10_AL12.preparado = true

    // Selecionar os Butões
    salArray = document.getElementsByName('salChama')

    // Selecionar os Spans com os Resultados da Tabela
    salEscolhidoResp = document.getElementById('salEscolhidoValue')
    corChamaResp = document.getElementById('corChamaValue')
}


// Altera o Sal escolhido, bem como a aparência dos butões
function escolherSal(num) {
    let pos = num - 1

    salArray[salEscolhidoPos].className = 'escolha'
    salArray[pos].className = 'escolha-atual'

    salEscolhidoPos = pos
    salEscolhidoNome = salArray[pos].innerText

    curva()
}


// Mostra os Resultados na Tabela, Nome do Sal e Cor da Chama
function curva() {
    if (salEscolhidoNome == 'NaCl') {
        salEscolhidoResp.innerText = 'Cloreto de Sódio'
        corChamaResp.innerText = 'Amarelo'
    } else if (salEscolhidoNome == 'CaCl2') {
        salEscolhidoResp.innerText = 'Cloreto de Cálcio'
        corChamaResp.innerText = 'Vermelho Claro'
    } else if (salEscolhidoNome == 'KCl') {
        salEscolhidoResp.innerText = 'Cloreto de Potássio'
        corChamaResp.innerText = 'Violeta'
    } else if (salEscolhidoNome == 'BaCl2') {
        salEscolhidoResp.innerText = 'Cloreto de Bário'
        corChamaResp.innerText = 'Verde'
    } else if (salEscolhidoNome == 'LiCl') {
        salEscolhidoResp.innerText = 'Cloreto de Lítio'
        corChamaResp.innerText = 'Vermelho Escuro'
    } else if (salEscolhidoNome == 'CuCl2') {
        salEscolhidoResp.innerText = 'Cloreto de Cobre (II)'
        corChamaResp.innerText = 'Verde Claro'
    }
}

// Adicionar Imagens da Chama, quando as tiver