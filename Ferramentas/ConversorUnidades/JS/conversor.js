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


// Converter de Exponencial para Decimal
function expToDec(num) {
    let numStr = String(num)
    let numArr = numStr.split('e')
    let numDp = !!(Number(numArr[0]) % 1) ? (numArr[0].length - numStr.indexOf('.') - 1) : 0
    if (numArr.length == 2) {
        if (numArr[1] < 0) {
            numStr = num.toFixed(Math.abs(numArr[1]) + numDp)
            return numStr
        }
        numStr = num.toFixed(numDp)
        return numStr
    }
    return numStr
}

// Converter para notação científica em HTML
function base10HTML(num=1) {
    num = Number(num)
    if (num > 1e3 || num < 1e-03) {
        let base = String(num.toExponential()).split(/e/)
        base[1] = base[1].replace('+', '')
        base[1] = base[1].replace('-', '&minus;')

        if (base[0].length > 6) base[0] = String(Number(base[0]).toFixed(4))

        return `${base[0]} &times; 10<sup>${base[1]}</sup>`
    }
    num = String(num)
    if (num.length > 6) num = String(Number(num).toFixed(4))

    return num
}