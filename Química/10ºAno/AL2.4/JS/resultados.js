// Definir Constantes


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let Q10_AL24 = {
    preparado: false,
}

let tubos

let embrulhos = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
}


function prepararResultados() {
    if (Q10_AL24.preparado) {
        return
    }
    Q10_AL24.preparado = true

    // Selecionar os Butões
    tubos = document.getElementsByName('tubo')

    curva()
}


// Alterar os embrulhos dos Tubos e as aparências dos Butões
function escolherTubo(letraTubo, embrulhoEscolhido) {
    let posLetra, posEmbrulho

    // Retirar o embrulho ao tubo que o tinha antes
    let nomesTubos = ['A', 'B', 'C', 'D', 'E']
    for (let key in nomesTubos) {
        if (embrulhos[nomesTubos[key]] == embrulhoEscolhido) {
            tubos[embrulhoEscolhido * 5 + nomesTubos[key].codePointAt(0) - 65].className = 'escolha'
            tubos[embrulhos[letraTubo] * 5 + nomesTubos[key].codePointAt(0) - 65].className = 'escolha-atual'
            embrulhos[nomesTubos[key]] = embrulhos[letraTubo]
            break
        }
    }
    
    // Obter as posições da letra (coluna) e embrulho (linha)
    posLetra = letraTubo.codePointAt(0) - 65
    posEmbrulho = embrulhos[letraTubo]

    // Alterar os aspetos do butão da letra selecionada
    tubos[posEmbrulho * 5 + posLetra].className = 'escolha'
    tubos[embrulhoEscolhido * 5 + posLetra].className = 'escolha-atual'

    // Atualizar o Objeto que guarda os embrulhos de cada tubo
    embrulhos[letraTubo] = embrulhoEscolhido
}


// Mostrar o Resultado
function curva() {
}