// Definir constantes


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let Q11_AL11 = {
    preparado: false,
    divCurva: ''
}


function prepararResultados() {
    if (Q11_AL11.preparado) {
        return
    }
    Q11_AL11.preparado = true
}