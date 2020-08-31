// Definir Constantes
const g = 9.80665   // Aceleração Gravitaconal
const COF = 0.1 // Coeficiente de Fricção entre o carrinho e o plano



// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F11_AL12 = {
    preparado: false,
    divCurva: ''
}



function prepararResultados() {
    if (F11_AL12.preparado) {
        return
    }
    F11_AL12.preparado = true

    // Selecionar Sliders

    // Selecionar os Spans com os Valores dos Sliders

    // Selecionar as Curvas com os Gráficos

    // Selecionar os Spans da Tabela
    

    // Atualizar os Sliders
    
}


// Lei v(t)
function leiVelocidade(v0, a0, tempo) {
    return v0 + a0 * tempo
}

// Lei x(t)
function leiPosicao(x0, v0, a0, tempo){
    return x0 + v0 * tempo + 0.5 * a0 * (tempo ** 2)
}

