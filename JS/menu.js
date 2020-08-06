// Se necessário, fazer de forma a não ter de fazer mais Requests ao Server

// Valores Iniciais das Variaveis
let pronto = false
let aberto = 'teoria.html'

// Inicializar Variáveis Globais
let alvo, liTeoria, liMaterial, liProcedimento, liResultados

function carregar(ficheiro) {
    // Identificar os Elementos do Menu, após estes carregarem
    if (pronto == false) {
        alvo = document.getElementById('alvo')

        liTeoria = document.getElementById('teoria')
        liMaterial = document.getElementById('material')
        liProcedimento = document.getElementById('procedimento')
        liResultados = document.getElementById('resultados')

        pronto = true
    }
    // Abrir um novo ficheiro
    if (aberto != ficheiro) {
        alvo.setAttribute('incluir', ficheiro)
        incluirHTML()
        aberto = ficheiro

        liTeoria.style.textDecoration = ''
        liMaterial.style.textDecoration = ''
        liProcedimento.style.textDecoration = ''
        liResultados.style.textDecoration = ''
        if (aberto == 'teoria.html') {
            liTeoria.style.textDecoration = 'underline'
        } else if (aberto == 'material.html') {
            liMaterial.style.textDecoration = 'underline'
        } else if (aberto == 'procedimento.html') {
            liProcedimento.style.textDecoration = 'underline'
        } else if (aberto == 'resultados.html') {
            liResultados.style.textDecoration = 'underline'
        }
    }
}
