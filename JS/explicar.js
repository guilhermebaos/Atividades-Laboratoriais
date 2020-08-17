// Variáveis Globais para a função das Contas

let mostrarExpContasPronto = false
let expContasArray = []
let expContasAberto = 0
let pos = 0

function mostrarExpContas(num) {
    if (!mostrarExpContasPronto) {
        // Selecionar os parágrafos
        expContasArray = document.getElementsByName('exp-contas')

        mostrarExpContasPronto = true
    }
    // Se tentarmos abrir o que já está aberto, fecha-o
    if (num == expContasAberto) {
        expContasArray[num - 1].style.display = 'none'
        expContasAberto = 0
    // Fechar o que está atualmente aberto
    } else {
        expContasArray[num - 1].style.display = 'block'

        if (expContasAberto != 0) {
            expContasArray[expContasAberto - 1].style.display = 'none'
        }
        expContasAberto = num
    }
}


function mostrarExtra(keyWord) {
    let extra = document.getElementById(keyWord)
    if (extra.style.display == 'none') {
        extra.style.display = 'block'
    } else {
        extra.style.display = 'none'
    }
}