// Se necessário, fazer de forma a não ter de fazer mais Requests ao Server

// Valores Iniciais das Variaveis
let pronto = false
let aberto = 'teoria.html'

// Inicializar Variáveis Globais
let liTeoria, liMaterial, liProcedimento, liResultados
let divTeoria, divMaterial, divProcedimento, divResultados

function carregar(ficheiro) {
    // Identificar os Elementos do Menu, após estes carregarem
    if (pronto == false) {
        divTeoria = document.getElementById('div-teoria')
        divMaterial = document.getElementById('div-material')
        divProcedimento = document.getElementById('div-procedimento')
        divResultados = document.getElementById('div-resultados')

        liTeoria = document.getElementById('teoria')
        liMaterial = document.getElementById('material')
        liProcedimento = document.getElementById('procedimento')
        liResultados = document.getElementById('resultados')

        pronto = true
    }
    // Abrir um novo ficheiro
    if (aberto != ficheiro) {
        aberto = ficheiro

        liTeoria.style.textDecoration = ''
        liMaterial.style.textDecoration = ''
        liProcedimento.style.textDecoration = ''
        liResultados.style.textDecoration = ''
        
        divTeoria.style.display = 'none'
        divMaterial.style.display = 'none'
        divProcedimento.style.display = 'none'
        divResultados.style.display = 'none'

        if (aberto == 'teoria.html') {
            liTeoria.style.textDecoration = 'underline'
            divTeoria.style.display = 'initial'
        } else if (aberto == 'material.html') {
            liMaterial.style.textDecoration = 'underline'
            divMaterial.style.display = 'initial'
        } else if (aberto == 'procedimento.html') {
            liProcedimento.style.textDecoration = 'underline'
            divProcedimento.style.display = 'initial'
        } else if (aberto == 'resultados.html') {
            liResultados.style.textDecoration = 'underline'
            divResultados.style.display = 'initial'
        }
    }
}
