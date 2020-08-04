let pronto = false
let aberto = ''

function carregar(ficheiro) {
    if (pronto == false) {
        var alvo = document.getElementById('alvo')

        var tdTeoria = document.getElementById('teoria')
        var tdMaterial = document.getElementById('material')
        var tdProcedimento = document.getElementById('procedimento')
    }
    if (aberto != ficheiro) {
        alvo.setAttribute('incluir', ficheiro)
        incluirHTML()
        aberto = ficheiro
    } else {
        alvo.innerHTML = ''
        aberto = ''
    }

    tdTeoria.style.textDecoration = ''
    tdMaterial.style.textDecoration = ''
    tdProcedimento.style.textDecoration = ''
    if (aberto == 'teoria.html') {
        tdTeoria.style.textDecoration = 'underline'
    } else if (aberto == 'material.html') {
        tdMaterial.style.textDecoration = 'underline'
    } else if (aberto == 'procedimento.html') {
        tdProcedimento.style.textDecoration = 'underline'
    }
}
