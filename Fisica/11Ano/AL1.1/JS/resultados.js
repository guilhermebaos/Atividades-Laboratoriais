// Definir Constantes
const PI = Math.PI
const g = 9.81      // Aceleração Gravitaconal
const densidadeAr = 1.225 // kg/m^3
const CRar = 0.5    // Coeficiente de Resistência do ar para uma esfera, aproximado para Reynolds entre 2*10^3 e 2*10^5
                    // Razões para a aproximação ser razoável -> https://www.grc.nasa.gov/www/K-12/airplane/dragsphere.html e https://aerotoolbox.com/reynolds-number-calculator/
                    
// Constantes a passar para a Simulação
const CONSTANTES = {
    g: g,
    densidadeAr: densidadeAr,
    CRar: CRar
}

// Obter o DPR do ecrã
const DPR = window.devicePixelRatio

// Tamanho do deltaT em cada update (maior resolução, menor deltaT)
const RESOLUCAO = 15        


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F11_AL11 = {
    preparado: false,
    resultados: [],
    divCurva_xt: '',
    divCurva_vt: '',
    divCurva_at: '',
    divCurva_jt: '',
}

let calcularRAr = true

let btnCalcularRAr, btnDesprezarRAr

let massaEsfera, massaEsferaResp
let raioEsfera, raioEsferaResp
let distCelulas, distCelulasResp

let deltaT_celula2Resp, deltaT_quedaResp
let gravidadeExperimentalResp, erroGravidadeExperimentalResp

let canvasSim, ctx, simula

function prepararResultados() {
    if (F11_AL11.preparado) {
        return
    }
    
    // Selecionar os Butões
    btnCalcularRAr = document.getElementById('calcularRAr')
    btnDesprezarRAr = document.getElementById('desprezarRAr')

    // Selecionar Sliders
    massaEsfera = document.getElementById('massaEsfera')   
    raioEsfera = document.getElementById('raioEsfera') 
    distCelulas = document.getElementById('distCelulas')

    // Selecionar os Spans com os Valores dos Sliders
    massaEsferaResp = document.getElementById('massaEsferaValue')
    raioEsferaResp = document.getElementById('raioEsferaValue')
    distCelulasResp = document.getElementById('distCelulasValue')

    // Selecionar as Curvas com os Gráficos
    F11_AL11.divCurva_xt = document.getElementById('curva-xt')
    F11_AL11.divCurva_vt = document.getElementById('curva-vt')
    F11_AL11.divCurva_at = document.getElementById('curva-at')
    F11_AL11.divCurva_jt = document.getElementById('curva-jt')

    // Selecionar os Spans com os Resultados da Tabela
    deltaT_celula2Resp = document.getElementById('deltaT-celula2')
    deltaT_quedaResp = document.getElementById('deltaT-queda')
    gravidadeExperimentalResp = document.getElementById('gravidade-experimental')
    erroGravidadeExperimentalResp = document.getElementById('erro-gravidade-experimental')

    // Atualizar os Sliders
    massaEsfera.oninput = () => {
        let massaEsferaValue = massaEsfera.value / 1
    
        massaEsferaResp.innerText = `${massaEsferaValue.toFixed(0)}`
        
        reiniciar()
    }
    raioEsfera.oninput = () => {
        let raioEsferaValue = raioEsfera.value / 10
    
        raioEsferaResp.innerText = `${raioEsferaValue.toFixed(1)}`
        
        reiniciar()
    }
    distCelulas.oninput = () => {
        let distCelulasValue = distCelulas.value / 1
    
        distCelulasResp.innerText = `${distCelulasValue.toFixed(0)}`
        
        reiniciar()
    }


    // SIMULAÇÂO
    
    // Selecionar o Canvas e o seu context
    canvasSim = document.getElementById('canvasSim')

    ctx = canvasSim.getContext('2d')

    ctx.scale(DPR, DPR)

    // Criar o Objeto Simula
    simula = new window.Simula(canvasSim, RESOLUCAO, CONSTANTES)

    F11_AL11.preparado = true
    loopSimula()
}


// Corrige o tamanho do Canvas e corrige o DPR
function fixDPR() {
    let minAltura = 225

    // Usar variável global
    if (simulaFQmenu.aberto !== 'resultados.html') return

    // Altura do CSS
    let altura_css = +getComputedStyle(canvasSim).getPropertyValue('height').slice(0, -2)
    if (altura_css < minAltura) altura_css = minAltura

    // Larura do CSS
    let largura_css = +getComputedStyle(canvasSim).getPropertyValue('width').slice(0, -2)

    // Altera o tamanho do canvas
    canvasSim.width = largura_css * DPR
    canvasSim.height = altura_css * DPR

    simula.novoTamanho()
}


// Selecionar se vamos calcular ou não a Resistência do Ar
function mudarCalcularRAr(paraCalcular) {
    calcularRAr = paraCalcular
    if (paraCalcular) {
        btnCalcularRAr.className = 'escolha-atual'
        btnDesprezarRAr.className = 'escolha'
    } else {
        btnCalcularRAr.className = 'escolha'
        btnDesprezarRAr.className = 'escolha-atual'
    }
    simula.calcularRar = paraCalcular
    reiniciar()
}


// Reiniciar a Simulação
function reiniciar(start=false) {
    simula.reiniciar(start)
}


// Criar o loop da Simulação
let ultimoTempo

function loopSimula(tempo) {
    if (ultimoTempo === undefined) {
        ultimoTempo = tempo
        fixDPR()
        requestAnimationFrame(loopSimula)
        return
    }

    let deltaTempo = tempo - ultimoTempo
    ultimoTempo = tempo
    
    let dados
    for (let i = 0; i < RESOLUCAO; i++) {
        dados = simula.update(deltaTempo)
        if (dados) {
            let dT2 = (dados[0] * 1000).toFixed(2)
            let dTq = (dados[1] * 1000).toFixed(1)
            
            deltaT_celula2Resp.innerText = `${dT2}`
            deltaT_quedaResp.innerText = `${dTq}`

            let gExperimental = (raioEsfera.value / 1000 * 2 / (dT2 / 1000)) / (dTq / 1000)
        
            let errogExperimental = Math.abs(gExperimental - g) / g * 100
        
            gravidadeExperimentalResp.innerText = `${gExperimental.toFixed(2)}`
            erroGravidadeExperimentalResp.innerText = `${errogExperimental.toFixed(1)}`
        }
    }

    ctx.clearRect(0, 0, canvasSim.width, canvasSim.height)
    simula.desenhar(ctx)

    requestAnimationFrame(loopSimula)
}

/*

// Calcular os Pontos dos vários gráficos, xt, vt, at e jt
function pontos() {
    // Declarar variáveis e valores iniciais
    let m = massaEsfera.value / 1000
    let h = distCelulas.value / 100

    let t = 0
    let x = 0
    let v = 0
    let a = g
    let j = 0

    let tim = [t]
    let pos = [x]
    let vel = [v]
    let acc = [a]
    let jer = [j]
    let deltaT = 0.001

    let P = m * g
    let Rar
    let Fr

    while (true) {
        t += deltaT                         // Instante de tempo a que correspondem os valores calculados
        if (calcularRAr) {
            Rar = intensidadeResistAr(v)    // Calcular a Resistência do Ar de acordo com o Vf do intervalo anteriormente calculado
        } else {
            Rar = 0
        }
        Fr = P - Rar                        // Calcular o módulo da resultante de forças
        a = Fr / m                          // Calcular o módulo da aceleração
        x = leiPosicao(x, v, a, deltaT)     // Calcular o Xf de acrdo com o Xf e Vf do instante anterior e a aceleração deste
        v = leiVelocidade(v, a, deltaT)     // Calcular o Vf de acordo com o Vf do instante anterior e a aceleração deste
        j = (a - acc[acc.length - 1]) / (t - tim[tim.length - 1])   // Calcular o J usando (y2 - y1) / (x2 - x1), para dois pontos consecutivos

        if (x >= h) {
            break
        }

        // Guardar os valores
        tim.push(t.toFixed(3))
        pos.push(x)
        vel.push(v)
        acc.push(a)
        jer.push(j)
    }
    return [tim, pos, vel, acc, jer]
}


// Calcula os Valores Relacionados com a Queda da Esfera e mostra da Tabela
function curva() {
    // Guardar os Resultados para os Gráficos Extra
    F11_AL11.resultados = pontos()

    // Extrair os Resultados
    let resultados = F11_AL11.resultados

    let tim = resultados[0]
    let t_f = Number(tim[tim.length - 1]) * 1000

    let vel = resultados[2]
    let v_f = vel[vel.length - 1]

    let acc = resultados[3]
    let a_f = acc[acc.length - 1]

    let d = 2 * raioEsfera.value / 1000 // m

    // Fórmula Quadrática com a lei x(t) para determinar o delta t de passagem, com RAr suposta constante
    let deltaT_celula2Value = (-1 * v_f + (v_f ** 2 + 2 * a_f * d) ** 0.5) / a_f * 1000 // ms
    let vm = d / deltaT_celula2Value * 1000`

    curvaExtra()
}


// Fazer os gráficos Extra e mostrar nas divs-Extra
function curvaExtra() {
    // Remover os Canvas antigos
    F11_AL11.divCurva_xt.innerHTML = ''

    F11_AL11.divCurva_vt.innerHTML = ''

    F11_AL11.divCurva_at.innerHTML = ''

    F11_AL11.divCurva_jt.innerHTML = ''

    // Variáveis das funções
    let resultados = F11_AL11.resultados
    let tim = resultados[0]
    let pos = resultados[1]
    let vel = resultados[2]
    let acc = resultados[3]
    let jer = resultados[4]

    // Criar os canvas onde vão estar as curvas
    canvasCurva_xt = document.createElement('canvas')
    canvasCurva_xt.setAttribute('id', 'canvasCurva-xt')
    F11_AL11.divCurva_xt.appendChild(canvasCurva_xt)

    canvasCurva_vt = document.createElement('canvas')
    canvasCurva_vt.setAttribute('id', 'canvasCurva-vt')
    F11_AL11.divCurva_vt.appendChild(canvasCurva_vt)
    
    canvasCurva_at = document.createElement('canvas')
    canvasCurva_at.setAttribute('id', 'canvasCurva-at')
    F11_AL11.divCurva_at.appendChild(canvasCurva_at)
    
    canvasCurva_jt = document.createElement('canvas')
    canvasCurva_jt.setAttribute('id', 'canvasCurva-jt')
    F11_AL11.divCurva_jt.appendChild(canvasCurva_jt)
    
    // Criar os Chart Object
    let graCurva_xt = new Chart(canvasCurva_xt, {
        type: 'line',
        data: {
            labels: tim,
            datasets: [{
                data: pos,
                label: 'Posição da Esfera/ m',
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
                        labelString: 'Componente Escalar da posição da Esfera/ m',
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

                        return 'Tempo: ' + Number(tooltipItem.label).toFixed(3) + 's'
                    },
                    label: function(tooltipItem, data) {
                        let value = Number(tooltipItem.value).toFixed(3)
    
                        return 'Posição: ' + value + 'm'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })
    let graCurva_vt = new Chart(canvasCurva_vt, {
        type: 'line',
        data: {
            labels: tim,
            datasets: [{
                data: vel,
                label: 'Componente Escalar da Velocidade da Esfera/ m/s',
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
                        labelString: 'Componente Escalar da Velocidade da Esfera/ m/s',
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

                        return 'Tempo: ' + Number(tooltipItem.label).toFixed(3) + 's'
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
    let graCurva_at = new Chart(canvasCurva_at, {
        type: 'line',
        data: {
            labels: tim,
            datasets: [{
                data: acc,
                label: 'Componente Escalar da Aceleração da Esfera/ m/s/s',
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
                        labelString: 'Componente Escalar da Aceleração da Esfera/ m/s/s',
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

                        return 'Tempo: ' + Number(tooltipItem.label).toFixed(3) + 's'
                    },
                    label: function(tooltipItem, data) {
                        let value = Number(tooltipItem.value).toFixed(3)
    
                        return 'Aceleração: ' + value + 'm/s/s'
                    }
                },
                custom: function(tooltip) {
                    if (!tooltip) return
                    tooltip.displayColors = false
                },
            }
        },
    })
    let graCurva_jt = new Chart(canvasCurva_jt, {
        type: 'line',
        data: {
            labels: tim,
            datasets: [{
                data: jer,
                label: 'Componente Escalar do Jerk da Esfera/ m/s/s/s',
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
                        labelString: 'Componente Escalar do Jerk da Esfera/ m/s/s/s',
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

                        return 'Tempo: ' + Number(tooltipItem.label).toFixed(3) + 's'
                    },
                    label: function(tooltipItem, data) {
                        let value = Number(tooltipItem.value).toFixed(3)
    
                        return 'Jerk: ' + value + 'm/s/s/s'
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
*/

window.onresize = fixDPR