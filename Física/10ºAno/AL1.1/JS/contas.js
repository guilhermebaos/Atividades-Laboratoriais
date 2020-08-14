let mostrarExpPronto = false
let expContasArray = []
let expContasAberto = 0
let pos = 0

function mostrarExp(num) {
    if (!pronto) {
        expContasArray.push(document.getElementById('exp-contas-1'))
        expContasArray.push(document.getElementById('exp-contas-2'))
        expContasArray.push(document.getElementById('exp-contas-3'))
        expContasArray.push(document.getElementById('exp-contas-4'))

        pronto = true
    }
    if (num == expContasAberto) {
        expContasArray[num - 1].style.display = 'none'
        expContasAberto = 0
    } else {
        expContasArray[num - 1].style.display = 'initial'

        if (expContasAberto != 0) {
            expContasArray[expContasAberto - 1].style.display = 'none'
        }
        expContasAberto = num
    }
}