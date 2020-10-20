// Definir Constantes


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let Q11_AL22 = {
    preparado: false,
}

let metais
let cats

let parEscolhido = [0, 1]

let resultadoAntigo = '01'
let resultadoNovo


function prepararResultados() {
    if (Q11_AL22.preparado) {
        return
    }

    // Selecionar os Butões
    metais = document.getElementsByName('metal')
    cats = document.getElementsByName('catião')
    
    Q11_AL22.preparado = true
}


// Escolher o Metal
function escolherMet(num) {
    metais[parEscolhido[0]].className = 'escolha'
    metais[num].className = 'escolha-atual'
    parEscolhido[0] = num
}


// Escolher o Catião em Solução Aquosa
function escolherCat(num) {
    cats[parEscolhido[1]].className = 'escolha'
    cats[num].className = 'escolha-atual'
    parEscolhido[1] = num
}


// Mostrar o Resultado
function curva() {
    if (parEscolhido[0] == parEscolhido[1]) {
        resultadoNovo = 'erro'
    } else resultadoNovo = parEscolhido.toString().replaceAll(',', '')
    if (resultadoAntigo != resultadoNovo) {
        mostrarExtra(resultadoAntigo)
        mostrarExtra(resultadoNovo)
        resultadoAntigo = resultadoNovo
    }
}