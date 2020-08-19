// Definir Constantes
const PI = Math.PI
const g = 9.80665   // Aceleração Gravitaconal
const densidadeAr = 1.225 // kg/m^3
const CRar = 0.5    // Coeficiente de Resistência do ar para uma esfera, aproximado para Reynolds entre 2*10^3 e 2*10^5
                    // Razões para a aproximação ser razoável -> https://www.grc.nasa.gov/www/K-12/airplane/dragsphere.html e https://aerotoolbox.com/reynolds-number-calculator/


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F11_AL11 = {
    preparado: false,
    divCurva: '',
    divCurvaExtra: ''
}

let densidadeMax = 30 // g/cm^3
let densidadeMin = 1 // g/cm^3

let massaEsfera
let raioEsfera
let distCelulas

let massaEsferaResp
let raioEsferaResp
let distCelulasResp

function prepararResultados() {
    if (F11_AL11.preparado) {
        return
    }
    F11_AL11.preparado = true
    
    // Selecionar Sliders
    massaEsfera = document.getElementById('massaEsfera')   
    raioEsfera = document.getElementById('raioEsfera') 
    distCelulas = document.getElementById('distCelulas')

    // Selecionar os Spans com os Valores dos Sliders
    massaEsferaResp = document.getElementById('massaEsferaValue')
    raioEsferaResp = document.getElementById('raioEsferaValue')
    distCelulasResp = document.getElementById('distCelulasValue')

    // Atualizar os Sliders
    massaEsfera.oninput = function atualizarMassaEsfera() {
        let massaEsferaValue = massaEsfera.value / 1
    
        massaEsferaResp.innerHTML = `${massaEsferaValue.toFixed(0)}`
    }
    raioEsfera.oninput = function atualizarRaioEsfera() {
        let raioEsferaValue = raioEsfera.value / 10
    
        raioEsferaResp.innerHTML = `${raioEsferaValue.toFixed(1)}`
    }
    distCelulas.oninput = function atualizarDistCelulas() {
        let distCelulasValue = distCelulas.value / 1
    
        distCelulasResp.innerHTML = `${distCelulasValue.toFixed(0)}`
    }
}