import Montagem from '../JS/montagem.js'


// Classe que vai executar a Simulação
window.Simula = class Simula {
    constructor(canvas, constantes) {
        // Guardar o canvas
        this.canvas = canvas

        // Constantes
        this.constantes = constantes

        // Tamanho da Simulação
        this.novoTamanho()

        // Inputs
        this.inputs = this.juntarValores()

        this.montagem = new Montagem(this)

        this.reiniciar()
    }

    // Reiniciar a Simulação
    reiniciar(start=false) {
        this.inputs = this.juntarValores()
        this.montagem.reiniciar(start)
    }

    // Atualizar o tamanho do canvas
    novoTamanho() {
        this.largura = this.canvas.width
        this.altura = this.canvas.height
    }

    // Desenhar os vetores
    desenharVetor(x0, y0, xFinal, yFinal, cor){
        // Variáveis a usar ao criar a seta
        let largura = 4
        let compTopo = 10

        // O final da seta fica a (xFinal, yFinal)
        if (xFinal == x0) {
            xFinal += 0
        } else if (xFinal > x0) {
            xFinal += compTopo + 1
        } else {
            xFinal -= compTopo + 1
        }

        if (yFinal == y0) {
            yFinal += 0
        } else if (yFinal > y0) {
            yFinal += compTopo + 1
        } else {
            yFinal -= compTopo + 1
        }

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

    // Juntar os valores para serem usados pela Simulação
    juntarValores() {
        return {
            m: massaCarrinho.value / 1000,      // Massa do Carrinho
            mMax: massaCarrinho.max / 1000,
            d: posCarrinho.value / 10,          // Posição do Carrinho na Rampa em cm
            dMax: posCarrinho.max / 10,          // Tamanho da Rampa em cm
            a: angPlanoInclinado.value / 10 * (Math.PI / 180),         // Inclinação em Radianos
            l: larguraTira.value / 10,      // Largura da tira em cm
            fa: forcaAtrito.value / 1000,   // Força de Atrito
        }
    }

    update(deltaTempo) {
        return this.montagem.update(deltaTempo)
    }

    desenhar(ctx) {
        this.montagem.desenhar(ctx)
    }
}