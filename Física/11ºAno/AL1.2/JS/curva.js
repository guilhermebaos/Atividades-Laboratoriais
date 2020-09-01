// Definir Constantes
const g = 9.80665   // Aceleração Gravitaconal
const CAM = 0.1 // Coeficiente de Atrito Máximo, relativamente ao Peso do Corpo Suspenso



// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F11_AL12 = {
    preparado: false,
    divCurva: ''
}

let massaCarrinho
let massaCorpoSuspenso
let alturaCorpoSuspenso
let forçaAtrito

let massaCarrinhoResp
let massaCorpoSuspensoResp
let alturaCorpoSuspensoResp
let forçaAtritoResp

let aZona1Resp
let aZona2Resp



function prepararResultados() {
    if (F11_AL12.preparado) {
        return
    }
    F11_AL12.preparado = true

    // Selecionar Sliders
    massaCarrinho = document.getElementById('massaCarrinho')
    massaCorpoSuspenso = document.getElementById('massaCorpoSuspenso')
    alturaCorpoSuspenso = document.getElementById('alturaCorpoSuspenso')
    forçaAtrito = document.getElementById('forçaAtrito')

    // Selecionar os Spans com os Valores dos Sliders
    massaCarrinhoResp = document.getElementById('massaCarrinhoValue')
    massaCorpoSuspensoResp = document.getElementById('massaCorpoSuspensoValue')
    alturaCorpoSuspensoResp = document.getElementById('alturaCorpoSuspensoValue')
    forçaAtritoResp = document.getElementById('forçaAtritoValue')

    // Selecionar a div que vai ter a Curva
    F11_AL12.divCurva = document.getElementById('curva-vt')

    // Selecionar os Spans da Tabela
    aZona1Resp = document.getElementById('aZona1Value')
    aZona2Resp = document.getElementById('aZona2Value')

    // Atualizar os Sliders
    massaCarrinho.oninput = function atualizarMassaCarrinho() {
        let massaCarrinhoValue = massaCarrinho.value / 100
    
        massaCarrinhoResp.innerHTML = `${massaCarrinhoValue.toFixed(2)}`

        atualizarAtritoMax()
    }
    massaCorpoSuspenso.oninput = function atualizarMassaCorpoSuspenso() {
        let massaCorpoSuspensoValue = massaCorpoSuspenso.value / 100
    
        massaCorpoSuspensoResp.innerHTML = `${massaCorpoSuspensoValue.toFixed(2)}`

        atualizarAtritoMax()
    }
    alturaCorpoSuspenso.oninput = function atualizarAlturaCorpoSuspenso() {
        let alturaCorpoSuspensoValue = alturaCorpoSuspenso.value / 100
    
        alturaCorpoSuspensoResp.innerHTML = `${alturaCorpoSuspensoValue.toFixed(2)}`
    }
    forçaAtrito.oninput = function atualizarForçaAtrito() {
        let forçaAtritoValue = forçaAtrito.value / 1000
    
        forçaAtritoResp.innerHTML = `${forçaAtritoValue.toFixed(3)}`
    }

    curva()
}

// Limitar a Força de Atrito Máxima Sentida pelo Carrinho
function atualizarAtritoMax() {
    let mCa = massaCarrinho.value / 100
    let mCS = massaCorpoSuspenso.value / 100

    // Limitar o Atrito para que a Força Resultante realize trabalho Positivo sobre o Carrinho (para isso, P >> Fa, caso contrário o Carrinho poderia ficar parado)
    let Fresultante = mCS * g               // Força Resultante do Sistema = Peso do Corpo Suspenso
    let FaMax = CAM * Fresultante           // A Força de Atrito não poderá ser maior do que o Peso do Corpo Suspenso

    let FaMaxConvertido = Math.floor(FaMax * 1000)

    if (forçaAtrito.value > FaMaxConvertido) {
        forçaAtritoResp.innerHTML = `${(FaMaxConvertido / 1000).toFixed(3)}`
    }

    forçaAtrito.max = FaMaxConvertido
}


// Lei v(t)
function leiVelocidade(v0, a0, tempo) {
    return v0 + a0 * tempo
}

// Lei x(t)
function leiPosicao(x0, v0, a0, tempo){
    return x0 + v0 * tempo + 0.5 * a0 * (tempo ** 2)
}


// Calcular os Pontos dos Gráfico 
function pontos() {
    // Declarar variáveis e valores iniciais
    let mCa = massaCarrinho.value / 100
    let mCS = massaCorpoSuspenso.value / 100
    let h = alturaCorpoSuspenso.value / 100

    let mSIST = mCa + mCS

    let PCS = mCS * g
    let Fa = forçaAtrito.value / 1000
    let Fr = PCS - Fa

    let t = 0
    let x = 0
    let v = 0
    let a = Fr / mSIST

    let tim = [t]
    let pos = [x]
    let vel = [v]
    let acc = [a]
    let deltaT = 0.002 + Math.floor(h) / 1000 + Math.floor(mCa) / 1000

    let corpoAtingiuSolo = false

    while (true) {
        t += deltaT

        x = leiPosicao(x, v, a, deltaT)             // Calcular o Xf de acrdo com o Xf e Vf do instante anterior e a aceleração deste
        v = leiVelocidade(v, a, deltaT)             // Calcular o Vf de acordo com o Vf do instante anterior e a aceleração deste

        if (x >= h && !corpoAtingiuSolo) {          // O Corpo Suspenso atinge o Solo
            Fr -= PCS                               // Altera-se a força Resultante do Sistema
            aZona1Resp.innerText = `${a.toFixed(3)}`
            a = Fr / mSIST                          // ALtera-se a aceleração do Carrinho
            aZona2Resp.innerText = `${a.toFixed(3)}`
            corpoAtingiuSolo = true
        } else if (x >= 2 * h && corpoAtingiuSolo) {
            break
        }

        // Guardar os valores
        tim.push(t.toFixed(3))
        pos.push(x)
        vel.push(v)
        acc.push(a)
    }
    return [tim, pos, vel, acc]
}


// Traçar o gráfico Velocidade-Tempo
function curva() {
    // Remover o Canvas antigo
    let canvasCurva = document.getElementById('canvasCurva')
    F11_AL12.divCurva.removeChild(canvasCurva)

    // Obter e guardar os resultados
    let resultados = pontos()
    let tem = resultados[0]
    let vel = resultados[2]

    // Criar o canvas onde vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurva')
    F11_AL12.divCurva.appendChild(canvasCurva)

    // Criar o Chart Object
    let graCurva = new Chart(canvasCurva, {
        type: 'line',
        data: {
            labels: tem,
            datasets: [{
                data: vel,
                label: 'Módulo da Velocidade do Carrinho',
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tempo/ s',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Módulo da Velocidade do Carrinho/ m/s',
                        fontColor: 'black',
                        fontSize: 13,
                        fontFamily: '"Arial", "sans-serif"'
                    }  
                }]
            },
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItems, data) {
                        let tooltipItem = tooltipItems[0]

                        return 'Tempo: ' + tooltipItem.label + 's'
                    },
                    label: function(tooltipItem, data) {
                        let value = Number(tooltipItem.value).toFixed(3)
    
                        return 'Velocidade: ' + value + 'm/s'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })
}

// Ideia: Mostrar os Gráficos x-t e a-t
