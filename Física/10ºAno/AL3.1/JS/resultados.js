// Definir Constantes


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F10_AL31 = {
    preparado: false,
    divCurva: ''
}


function prepararResultados() {
    if (F10_AL31.preparado) {
        return
    }
    
    // Selecionar a div onde vai parar a curva

    F10_AL31.preparado = true
    curva()
}


// Mostra os Valores Relacionados com a Queda da Esfera
function curva() {
    // Remover o Canvas antigo
    F10_AL31.divCurva.innerHTML = ''

    // Criar o canvas on de vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurva')
    F10_AL31.divCurva.appendChild(canvasCurva)

    // Criar o Chart Object
}