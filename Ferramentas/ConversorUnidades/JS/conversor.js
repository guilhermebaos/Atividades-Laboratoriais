// Constantes Físicas
const comprimentos = {
    'pm': 1e-12,
    'nm': 1e-09,
    '&mu;m': 1e-06,
    'mm': 1e-03,
    'cm': 1e-02,
    'dm': 1e-01,
    'm': 1,
    'dam': 1e01,
    'hm': 1e02,
    'km': 1e03,
    'Mm': 1e06,
    'Gm': 1e09,
    'Tm': 1e12,
    'in': 0.0254,
    'ft': 0.3048
}
const comprimentosNomes = {
    'pm': 'Picómetro',
    'nm': 'Nanómetro',
    '&mu;m': 'Micrómetro',
    'mm': 'Milímetro',
    'cm': 'Centímetro',
    'dm': 'Decímetro',
    'm': 'Metro',
    'dam': 'Decâmetro',
    'hm': 'Hectómetro',
    'km': 'Kilómetro',
    'Mm': 'Megametro',
    'Gm': 'Gigametro',
    'Tm': 'Terametro',
    'in': 'Polegada',
    'ft': 'Pé'
}


// HTML Constante
const converterDe = document.getElementById('converterDe')
const converterPara = document.getElementById('converterPara')

const converterNum = document.getElementById('converterNum')
const converterResultado = document.getElementById('converterResultado')

const unidadesDe = document.getElementsByName('unidadesDe')
const unidadesPara = document.getElementsByName('unidadesPara')

const unidadesDeExtenso = document.getElementsByName('unidadesDeExtenso')
const unidadesParaExtenso = document.getElementsByName('unidadesParaExtenso')

const unidadesDeGenero = document.getElementsByName('unidadesDeGenero')
const unidadesParaGenero = document.getElementsByName('unidadesParaGenero')

const razao1 = document.getElementsByName('razao1')
const razaoQuadrado1 = document.getElementsByName('razaoQuadrado1')




// Selecionar a Grandeza
function grandeza(nomeFicheiro='') {
    let URLatual = window.location.pathname.replace(/[^/]*$/, '')
    window.location.pathname = `${URLatual}${nomeFicheiro}`
}


// Alterar o conteúdo de um array de elementos HTML
function textoArr(arr=[], texto='Erro') {
    arr.forEach(e => e.innerHTML = texto)
}

// Converter base 10 de JS para HTML
function base10HTML(num=1) {
    if (!Number.isInteger(num)) num = removerDigitos(num)
    if (num > 1e3 || num < 1e-03) {
        let base = String(num.toExponential()).split(/e/)
        base[1] = base[1].replace('+', '')
        base[1] = base[1].replace('-', '&minus;')
        return `${base[0]} &times; 10<sup>${base[1]}</sup>`
    }
    return String(num)
}

// Remover digitos a mais, criados por imprecisões
function removerDigitos(num=1) {
    let numStr = String(num)
    let erros = ['0000', '9999']
    for (let i in erros) {
        let teste = erros[i]
        let fimPrecisao = numStr.indexOf(teste)
        if (fimPrecisao != -1) {
            num = Number(numStr).toPrecision(fimPrecisao - 2)
            return num
        }
    }
    return num
}


// Converter Áreas
function area(novasUnidades=false) {
    if (novasUnidades) {
        // Obter as Unidades
        let uDe = converterDe.value
        let uPara = converterPara.value

        // Escrever o símbolo das unidades
        textoArr(unidadesDe, uDe)
        textoArr(unidadesPara, uPara)
        
        // Escrever o nome das unidades por extenso
        textoArr(unidadesDeExtenso, comprimentosNomes[uDe])
        textoArr(unidadesParaExtenso, comprimentosNomes[uPara])
        
        // Escrever quadrad@, dependendo se é feminino ou masculino
        let letra = uDe == 'in' ? 'a' :  'o'
        textoArr(unidadesDeGenero, letra)
        
        letra = uPara == 'in' ? 'a' :  'o'
        textoArr(unidadesParaGenero, letra)

        // Escrever as razões
        let valorDe = comprimentos[uDe]
        let valorPara = comprimentos[uPara]

        let r = valorDe / valorPara

        textoArr(razao1, base10HTML(r))
        textoArr(razaoQuadrado1, base10HTML(r**2))
    }

    
}
