import Dados from '../JS/dados.js'

const ESTADOS = {
    EM_PROGRESSO: 0,
    PAUSA: 1
}

// Classe que vai executar a Simulação
export default class Simula {
    constructor(canvas, resolucao) {
        this.canvas = canvas

        // Resolução (Tamanho do deltaT) e Updates por Frame
        this.resolucao = resolucao

        // Tamanho da Simulação
        this.novoTamanho()

        // Inputs usados para a Simulação
        this.inputs = this.juntarValores()

        // Estado da Simulação
        this.estado = ESTADOS.EM_PROGRESSO

        // Objetos da Simulação
        this.dados = new Dados(this)
    }

    reiniciar(start=false) {
        this.start = start
        this.inputs = this.juntarValores()

        this.dados.reiniciar()
        
        this.novoTamanho()
    }

    novoTamanho() {
        this.largura = this.canvas.width
        this.altura = this.canvas.height
    }

    // Juntar os valores para serem usados pela Simulação
    juntarValores() {
        return {
            m: valorMassa.value / 1000,         // Massa em kg
            mMax: valorMassa.max / 1000,        // Massa máxima
            l: comprimentoMola.value / 100,     // Comprimento da Mola em m    
            xInicial: posInicial.value / 100,   // Possição Inicial em m
            xInicialMax: posInicial.max / 100,  // Possição Inicial Max em m 
            g: aGravitica.value / 100,          // Aceleração Grav. em m/s^2
        }
    }

    // Desenhar os vetores
    desenharVetor(ctx, x0, y0, xFinal, yFinal, cor){
        // Variáveis a usar ao criar a seta
        let largura = 4
        let compTopo = 10

        let angle = Math.atan2(yFinal - y0, xFinal - x0)

        // Corpo da Seta
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(xFinal, yFinal)
        ctx.strokeStyle = cor
        ctx.lineWidth = largura
        ctx.stroke()
        
        // Desenhar um dos traços da cabeça da seta
        ctx.beginPath()
        ctx.moveTo(xFinal, yFinal)
        ctx.lineTo(xFinal - compTopo * Math.cos(angle - Math.PI/7), yFinal - compTopo * Math.sin(angle - Math.PI/7))
        
        // Desenhar o outro traço
        ctx.lineTo(xFinal - compTopo * Math.cos(angle + Math.PI/7), yFinal - compTopo * Math.sin(angle + Math.PI/7))
        
        // Caminho de uma ponta para o centro e de novo para a outra ponta da cabeça da seta
        ctx.lineTo(xFinal, yFinal)
        ctx.lineTo(xFinal - compTopo * Math.cos(angle - Math.PI/7), yFinal - compTopo * Math.sin(angle - Math.PI/7))

        // Desenhar os caminhos traçados acima
        ctx.strokeStyle = cor
        ctx.lineWidth = largura
        ctx.stroke()
        ctx.fillStyle = cor
        ctx.fill()
    }

    pausa() {
        if (this.estado == ESTADOS.PAUSA) {
            this.estado = ESTADOS.EM_PROGRESSO
        } else {
            this.estado = ESTADOS.PAUSA
        }
    }

    update(deltaTempo) {
        if (this.estado !== ESTADOS.EM_PROGRESSO) return

        if (this.start) {
            return this.dados.update(deltaTempo)
        }
    }

    desenhar(ctx) {
        if (this.estado == ESTADOS.PAUSA) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
            ctx.fillRect(0, 0, this.largura, this.altura)
        } else {
            
        }
    }
}