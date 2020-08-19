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

let areaEsfera = PI * 0.02 ** 2    // m^2

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


// Calcular a Área de Superfície da Esfera
function calcularAreaEsfera() {
    raio = raioEsfera.value / 1000  // m
    areaEsfera = PI * raio ** 2     // m^2
}

// Função para calcular a Intensidade da Resistência do Ar
function intensidadeResistAr(velocidade) {
    return 0.5 * densidadeAr * CRar * areaEsfera * velocidade ** 2
}

// Lei v(t)
function leiVelocidade(v0, a0, tempo) {
    return v0 + a0 * tempo
}

// Lei x(t)
function leiPosicao(x0, v0, a0, tempo){
    return x0 + v0 * tempo + 0.5 * a0 * (tempo ** 2)
}