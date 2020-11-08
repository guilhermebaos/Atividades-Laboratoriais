// Definir Constantes
const nAr = 1.00


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F11_AL31 = {
    preparado: false,
    divCurva: '',
    processandoAnim: false
}

let angIncide
let angIncideRefra
let indiceRefra

let angIncideResp
let angIncideRefraResp
let indiceRefraResp


let fenomBtns
let fenomEscolhido = 0


function prepararResultados() {
    if (F11_AL31.preparado) {
        return
    }
    
    // Selecionar Sliders
    angIncide = document.getElementById('angIncide')
    angIncideRefra = document.getElementById('angIncideRefra')
    indiceRefra = document.getElementById('indiceRefra')

    // Selecionar os Spans com os Valores dos Sliders
    angIncideResp = document.getElementById('angIncideValue')
    angIncideRefraResp = document.getElementById('angIncideRefraValue')
    indiceRefraResp = document.getElementById('indiceRefraValue')

    // Selecionar os Spans com os Resultados da Tabela

    // Selecionar a div que vai ter a Curva
    F11_AL31.divCurva = document.getElementById('curva-laser')

    // Selecionar os Butões que permitem escolher o Procedimento
    fenomBtns = document.getElementsByName('Fenómenos')

    // Atualizar os Sliders
    angIncide.oninput = function atualizarAngIncide() {
        let angIncideValue = angIncide.value / 10
    
        angIncideResp.innerText = `${angIncideValue.toFixed(1)}`
        curva()
    }
    angIncideRefra.oninput = function atualizarAngIncideRefra() {
        let angIncideRefraValue = angIncideRefra.value / 10

        if (angIncideRefraValue > 90) {
            angIncideRefraValue = 180 - angIncideRefraValue
        }
    
        angIncideRefraResp.innerText = `${angIncideRefraValue.toFixed(1)}`
        curva()
    }
    indiceRefra.oninput = function atualizarIndiceRefra() {
        let indiceRefraValue = indiceRefra.value / 1
    
        if (indiceRefraValue <= 20) {
            indiceRefraResp.innerText = 'Baixo'
        } else if (indiceRefraValue >= 40) {
            indiceRefraResp.innerText = 'Alto'
        } else {
            indiceRefraResp.innerText = 'Intermédio'
        }
        curva()
    }
    

    F11_AL31.preparado = true
    curva()
}


// Esolher o fenómeno a estudar


// Escolher o Procedimento a seguir
function fenomeno(num) {
    if (num == fenomEscolhido) return
    else {
        if (F11_AL31.processandoAnim) return
        F11_AL31.processandoAnim = true

        fenomBtns[fenomEscolhido].className = 'escolha'
        fenomBtns[num].className = 'escolha-atual'

        mostrarExtra(`Fenómeno${fenomEscolhido}`)
        window.setTimeout(mostrarExtra, mostrarExtraTempo, `Fenómeno${num}`)
        window.setTimeout(function() {
            F11_AL31.processandoAnim = false
        }, mostrarExtraTempo * 2)

        fenomEscolhido = num
    }
    prepCurva()
    curva()
}


// Mudar a background-image do gráfico
function prepCurva() {
    if (fenomEscolhido == 0) {
        F11_AL31.divCurva.style.backgroundImage = 'url("Imagens/Metal-background.png")'
    } else if (fenomEscolhido == 1) {
        F11_AL31.divCurva.style.backgroundImage = 'url("Imagens/Acrilico-background.png")'
    }
}


// Converter entre Radianos e Graus
function radianos(graus) {return graus * (Math.PI / 180)}
function graus(radianos) {return radianos * (180 / Math.PI)}


// Calcula o caminho tomado pelo laser
function pontos() {
    let x = -20
    let y

    let xArr = []
    let yArr = []
    if (fenomEscolhido == 0) {
        // Inclinação e Declive do feixe incidente
        let incI = radianos(angIncide.value / 10 + 90)
        let decliveI = Math.tan(incI)

        let angR = radianos(180) - incI
        let decliveR = Math.tan(angR)
        while (x <= 20.1) {
            if (x < 0) {
                y = decliveI * x
            } else {
                y = decliveR * x
            }
            x += 0.1

            xArr.push(x)
            yArr.push(y)
        }

        return [xArr, yArr]
    } else if (fenomEscolhido == 1) {
        // Inclinação e Declive do feixe incidente
        let incI = radianos(angIncideRefra.value / 10 + 90)
        let decliveI = Math.tan(incI)

        let angI = radianos(angIncideRefra.value / 10)
        let nAcr = 1.00 + indiceRefra.value / 100

        // Calcular o Declive do feixe refratado
        let decliveR
        if (graus(angI) <= 90) {
            let sinAngR = (nAr * Math.sin(angI)) / nAcr         // Lei de Snell-Descartes
            let angR = Math.asin(sinAngR)                       // Ângulo de Refração
            decliveR = -Math.tan(Math.PI/2 - angR)              // Declive do feixe refratado
        } else {
            let sinAngR = (nAcr * Math.sin(180 - angI)) / nAr   // Lei de Snell-Descartes
            if (sinAngR < 1) {
                let angR = Math.asin(sinAngR)                   // Ângulo de Refração
                decliveR = Math.tan(Math.PI/2 - angR)           // Declive do feixe refratado
            } else {
                let angR = Math.PI - angI                       // Ângulo de Refração
                decliveR = Math.tan(-Math.PI/2 + angR)          // Declive do feixe refratado
            }
        }

        // Calucular os pontos do gráfico y = f(x) para o feixe
        while (x <= 20.1) {
            if (x < 0) {
                y = decliveI * x
            } else {
                y = decliveR * x
            }
            x += 0.1

            xArr.push(x)
            yArr.push(y)
        }

        return [xArr, yArr]
    }
}


// Calcula e mostra os Resultados da Tabela
function curva() {
    // Remover o Canvas antigo
    F11_AL31.divCurva.innerHTML = ''

    // Criar o canvas onde vai estar a curva
    canvasCurva = document.createElement('canvas')
    canvasCurva.setAttribute('id', 'canvasCurva')
    F11_AL31.divCurva.appendChild(canvasCurva)

    if (fenomEscolhido == 0) {
        // Obter e guardar os resultados
        let resultados = pontos()
        let x = resultados[0]
        let y = resultados[1]

        // Criar o Chart Object
        let graCurva = new Chart(canvasCurva, {
            type: 'line',
            data: {
                labels: x,
                datasets: [{
                    data: y,
                    label: 'Laser',
                    borderColor: 'rgb(255, 0, 0)',
                    fill: false
                }]
            },
            options: {
                animation: {
                    duration: 0
                },
                hover: {
                    animationDuration: 0
                },
                responsiveAnimationDuration: 0,
                elements: {
                    point: {
                        radius: 1,
                        hitRadius: 1,
                        hoverRadius: 4
                    }
                },
                scales: {
                    xAxes: [{
                        display: false,
                        labelString: '',
                    }],
                    yAxes: [{
                        display: false,
                        ticks: {
                            max: 14,
                            min: -6.15
                        }
                    }]
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false
                }
            },
        })
    } else if (fenomEscolhido == 1) {
        // Obter e guardar os resultados
        let resultados = pontos()
        let x = resultados[0]
        let y = resultados[1]

        // Criar o Chart Object
        let graCurva = new Chart(canvasCurva, {
            type: 'line',
            data: {
                labels: x,
                datasets: [{
                    data: y,
                    label: 'Laser',
                    borderColor: 'rgb(255, 0, 0)',
                    fill: false
                }]
            },
            options: {
                animation: {
                    duration: 0
                },
                hover: {
                    animationDuration: 0
                },
                responsiveAnimationDuration: 0,
                elements: {
                    point: {
                        radius: 1,
                        hitRadius: 1,
                        hoverRadius: 4
                    }
                },
                scales: {
                    xAxes: [{
                        display: false,
                        labelString: '',
                    }],
                    yAxes: [{
                        display: false,
                        ticks: {
                            max: 10,
                            min: -10
                        }
                    }]
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false
                }
            },
        })
    }
}
