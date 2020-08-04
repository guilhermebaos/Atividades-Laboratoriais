let pronto = false
let aberto = ''

function carregar(ficheiro) {
    if (pronto == false) {
        var alvo = document.getElementById('alvo')

        var liTeoria = document.getElementById('teoria')
        var liMaterial = document.getElementById('material')
        var liProcedimento = document.getElementById('procedimento')
    }
    if (aberto != ficheiro) {
        alvo.setAttribute('incluir', ficheiro)
        incluirHTML()
        aberto = ficheiro
    } else {
        alvo.innerHTML = ''
        aberto = ''
    }

    liTeoria.style.textDecoration = ''
    liMaterial.style.textDecoration = ''
    liProcedimento.style.textDecoration = ''
    if (aberto == 'teoria.html') {
        liTeoria.style.textDecoration = 'underline'
    } else if (aberto == 'material.html') {
        liMaterial.style.textDecoration = 'underline'
    } else if (aberto == 'procedimento.html') {
        liProcedimento.style.textDecoration = 'underline'
    }
}
