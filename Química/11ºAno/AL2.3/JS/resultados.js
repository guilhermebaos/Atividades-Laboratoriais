// Definir constantes


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let Q11_AL23 = {
    preparado: false,
    divCurva: ''
}


function prepararResultados() {
    if (Q11_AL23.preparado) {
        return
    }
    
    // Selecionar os butões

    // Selecionar Sliders

    // Selecionar os Spans com os Valores dos Sliders

    // Selecionar a div onde vai parar a curva

    Q11_AL23.preparado = true
    curva()
}


// Recebe os valores do pH e traça a Curva de pH
function curva() {
    // Remover o Canvas antigo
    Q11_AL23.divCurva.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurva')
    Q11_AL23.divCurva.appendChild(canvasCurva)
}