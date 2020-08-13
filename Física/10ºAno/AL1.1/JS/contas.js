let mostrarExpPronto = false
let divExpContas
let divExpContasAberto = false

function mostrarExp() {
    if (!pronto) {
        divExpContas = document.getElementById('expContas')

        pronto = true
    }
    if (divExpContasAberto) {
        divExpContas.style.display = 'none'
        divExpContasAberto = false
    } else {
        divExpContas.style.display = 'initial'
        divExpContasAberto = true
    }
}