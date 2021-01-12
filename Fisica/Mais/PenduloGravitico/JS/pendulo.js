export default class Pendulo {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições da Bola
        this.raio = 16
        this.cor = 'red'
        
        this.reiniciar()
    }

    reiniciar() {
        // Ponto de fixação do fio
        this.fioPos = {x: this.simula.largura / 2, y: 0}

        // Posição da Bola
        this.posicao = {
            x: this.fioPos.x - this.simula.inputs.angSin * this.simula.inputs.comp,
            y: this.fioPos.y + this.simula.inputs.angCos * this.simula.inputs.comp
        }

        this.velocidade = {x: 0, y: 0, abs: 0}
    }

    update(deltaTempo) {
        // Módulo das forças a atuar na bola
        this.peso = this.simula.inputs.massa * this.simula.inputs.g
        this.tensao = this.simula.inputs.angCos * this.peso + 
                      this.simula.inputs.massa * (this.velocidade.abs ** 2) / this.simula.inputs.comp
        
        // Força Resultante
        this.resultante = {
            x: this.simula.inputs.angSin * this.tensao,
            y: this.peso - this.simula.inputs.angCos * this.tensao
        }
        
        // Aceleração da Bola
        this.aceleracao = {
            x: this.resultante.x / this.simula.inputs.massa,
            y: this.resultante.y / this.simula.inputs.massa
        }

        this.aceleracao.abs = (this.aceleracao.x ** 2 + this.aceleracao.y ** 2) ** 0.5

        // Velocidade da Bola
        this.velocidade.x += this.aceleracao.x * deltaTempo
        this.velocidade.y += this.aceleracao.y * deltaTempo

        // Posição da Bola
        this.posicao.x += this.velocidade.x * deltaTempo
        this.posicao.y += this.velocidade.y * deltaTempo

        // Novo Ângulo
        let vetor1 = {x: 0, y: 1, abs: 1}
        let vetor2 = {
            x: this.posicao.x - this.fioPos.x,
            y: this.posicao.y - this.fioPos.y
        }
        vetor2.abs = ((vetor2.x ** 2) + vetor2.y ** 2) ** 0.5

        this.simula.inputs.angCos = (vetor1.y * vetor2.y) / (vetor1.abs * vetor2.abs)
        
        if (this.posicao.x > this.fioPos.x) {
            this.simula.inputs.angSin = - ((1 - this.simula.inputs.angCos ** 2) ** 0.5)
            this.simula.inputs.ang = - Math.acos(this.simula.inputs.angCos)
        } else {
            this.simula.inputs.angSin = (1 - this.simula.inputs.angCos ** 2) ** 0.5
            this.simula.inputs.ang = Math.acos(this.simula.inputs.angCos)
        }

        // Módulo da Velocidade
        this.velocidade.abs = (this.velocidade.x ** 2 + this.velocidade.y ** 2) ** 0.5
        
    }

    desenhar(ctx) {
        // Desenhar o Fio
        ctx.beginPath()
        ctx.moveTo(this.fioPos.x, this.fioPos.y)
        ctx.lineTo(this.posicao.x, this.posicao.y)
        ctx.stroke()

        // Desenhar o Círculo no Ponto indicado pela posição
        ctx.fillStyle = this.cor
        ctx.beginPath()
        ctx.arc(
            this.posicao.x,
            this.posicao.y,
            this.raio * 2,
            0,
            2 * Math.PI
        )
        ctx.fill()
    }
}