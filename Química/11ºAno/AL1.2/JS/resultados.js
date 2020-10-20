// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let Q11_AL12 = {
    preparado: false,
}

let solEscolhidoPos = 0


function prepararResultados() {
    if (Q11_AL12.preparado) {
        return
    }

    // Selecionar os Butões
    solArray = document.getElementsByName('sAdicionada')

    Q11_AL12.preparado = true
}

// Altera a Solução escolhida, bem como a aparência dos butões
function escolherSol(pos) {
    if (pos != solEscolhidoPos) {
        solArray[solEscolhidoPos].className = 'escolha'
        solArray[pos].className = 'escolha-atual'
        
        curva()

        solEscolhidoPos = pos

        curva()
    }
}


// Mostra todo o raciocínio por detrás da mudança de cor
function curva() {
    mostrarExtra(`solução${solEscolhidoPos}`)
}