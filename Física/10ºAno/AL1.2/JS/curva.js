// Definir Constantes
const g = 9.80665 // Aceleração Gravitaconal

// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F10_AL12 = {
    preparado: false,
    divCurva: ''
}


function prepararResultados() {
    if (F10_AL12.preparado) {
        return
    }
    F10_AL12.preparado = true
}