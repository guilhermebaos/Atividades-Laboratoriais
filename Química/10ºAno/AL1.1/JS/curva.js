// Definir Constantes
const nAvogrado = 6.02214076e23

// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let Q10_AL11 = {
    preparado: false,
}

let densidadeMax = 1.00 // g/cm^3
let densidadeMin = 0.98 // g/cm^3

let massaCemGotas

let massaCemGotasResp

let massaGotaResp
let volumeGotaResp
let nGotaResp


function prepararResultados() {
    if (Q10_AL11.preparado) {
        return
    }
    Q10_AL11.preparado = true


    // Selecionar Sliders
    massaCemGotas = document.getElementById('massaCemGotas')
    volumeCemGotas = document.getElementById('volumeCemGotas')
    
    // Selecionar os Spans com os Valores dos Sliders
    massaCemGotasResp = document.getElementById('massaCemGotasValue')
    volumeCemGotasResp = document.getElementById('volumeCemGotasValue')

    // Selecionar os Spans com os Valores da Tabela
    massaGotaResp = document.getElementById('massaGotaValue')
    volumeGotaResp = document.getElementById('volumeGotaValue')
    nGotaResp = document.getElementById('nGotaValue')

    
    // Atualizar os Sliders
    massaCemGotas.oninput = function atualizarMassaCemGotas() {
        let massaCemGotasValue = massaCemGotas.value * 10
    
        massaCemGotasResp.innerHTML = `${massaCemGotasValue.toFixed(0)}`

        corrigirVolumeCemGotas()
    }
    volumeCemGotas.oninput = function atualizarVolumeCemGotas() {
        let volumeCemGotasValue = volumeCemGotas.value / 100
    
        volumeCemGotasResp.innerHTML = `${volumeCemGotasValue.toFixed(2)}`

        corrigirMassaCemGotas()
    }

    curva()
}

// Modificar o Volume para que densidade pertença a [0.98, 1.00]
function corrigirVolumeCemGotas() {
    let densidade = massaCemGotas.value / volumeCemGotas.value

    if (densidade < densidadeMin) {
        volumeCemGotas.value = massaCemGotas.value / densidadeMin       // Calcular o Volume usando a densidade Mínima

        let volumeCemGotasValue = volumeCemGotas.value / 100
        volumeCemGotasResp.innerHTML = `${volumeCemGotasValue.toFixed(2)}`
    } else if (densidade > densidadeMax) {
        volumeCemGotas.value = massaCemGotas.value / densidadeMax       // Calcular o Volume usando a densidade Máxima

        let volumeCemGotasValue = volumeCemGotas.value / 100
        volumeCemGotasResp.innerHTML = `${volumeCemGotasValue.toFixed(2)}`
    }
}

// Modificar a Massa para que densidade pertença a [0.98, 1.00]
function corrigirMassaCemGotas() {
    let densidade = massaCemGotas.value / volumeCemGotas.value

    if (densidade < densidadeMin) {
        massaCemGotas.value = volumeCemGotas.value * densidadeMin       // Calcular a Massa usando a densidade Mínima

        let massaCemGotasValue = massaCemGotas.value * 10
        massaCemGotasResp.innerHTML = `${massaCemGotasValue.toFixed(0)}`
    } else if (densidade > densidadeMax) {
        massaCemGotas.value = volumeCemGotas.value * densidadeMax       // Calcular a Massa usando a densidade Máxima

        let massaCemGotasValue = massaCemGotas.value * 10
        massaCemGotasResp.innerHTML = `${massaCemGotasValue.toFixed(0)}`
    }
}


// Calcular as características de uma gota de água
function curva() {
    let massa = massaCemGotas.value / 10
    let volume = volumeCemGotas.value / 10
    let N = (massa * 1e-3 / 18.02) * nAvogrado

    let nTexto = String(N.toExponential(5))
    nTexto = nTexto.slice(0, 5) + ' &times 10<sup>' + nTexto.slice(nTexto.length - 2) + '</sup>'

    massaGotaResp.innerHTML = `${massa.toFixed(2)}`
    volumeGotaResp.innerHTML = `${volume.toFixed(2)}`
    nGotaResp.innerHTML = `${nTexto}`
}

// Ideia: Incluir variação da densidade com a temperatura