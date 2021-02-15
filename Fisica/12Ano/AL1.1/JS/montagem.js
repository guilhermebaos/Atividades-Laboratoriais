// Montagem única
export default class Montagem {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições do Bloco
        this.esfera = {
            raio: 10 * (this.simula.inputs.d / this.simula.inputs.dMax) ** (1/3),
            cor: 'rgb(255, 130, 35)'
        }

        // Definições do Plano Horizontal
        this.rampa = {
            largura: 2,
            fim: this.simula.largura / 3,
            raio: this.simula.largura / 3,
            cor: 'rgb(10, 100, 230)',
        }

        // Definições da mesa
        this.mesa = {
            largura: 12,
            perna1: 0.15,           // Posição das pernas 1 e 2, em relação ao
            perna2: 0.85,           // comprimento da mesa
            cor: 'gray'
        }

        // Definições da caixa de areia
        this.caixa = {
            corAreia: 'yellow',
            corBorda: 'black'
        }

        this.hSimMetros = 3.5
        
        this.reiniciar()
    }

    // Reiniciar a Bola
    reiniciar() {
        // Inputs
        this.g = this.simula.inputs.g
        this.hi = this.simula.inputs.hi
        this.hl = this.simula.inputs.hl

        this.hiRampa = this.hi - this.hl

        // Definições do desenho
        this.alturaMesa = (this.hSimMetros - this.hl) / this.hSimMetros * this.simula.altura

        // Cinética
        this.posicao = {x: this.rampa.fim, y: this.alturaMesa,
            rampa: Math.asin((this.rampa.raio - this.hiRampa * 100) / this.rampa.raio) * this.rampa.raio
        }
        this.velocidade = {x: 0, y: 0, rampa: 0}
        this.aceleração = {x: 0, y: -this.g, rampa: 0}
    }

    update(deltaTempo) {
    }

    desenhar(ctx) {
        // Desenhar a mesa
        ctx.lineWidth = this.mesa.largura
        ctx.strokeStyle = this.mesa.cor
        ctx.beginPath()
        ctx.moveTo(-10, this.alturaMesa)
        ctx.lineTo(this.rampa.fim, this.alturaMesa)
        ctx.moveTo(this.rampa.fim * this.mesa.perna1, this.alturaMesa)
        ctx.lineTo(this.rampa.fim * this.mesa.perna1, this.simula.altura)
        ctx.moveTo(this.rampa.fim * this.mesa.perna2, this.alturaMesa)
        ctx.lineTo(this.rampa.fim * this.mesa.perna2, this.simula.altura)
        ctx.stroke()

        // Desenhar a rampa
        let centroRampa = {x: this.rampa.raio, y: this.alturaMesa - this.rampa.fim - this.mesa.largura / 2}

        ctx.lineWidth = this.rampa.largura
        ctx.strokeStyle = this.rampa.cor
        ctx.beginPath()
        ctx.arc(
            centroRampa.x,
            centroRampa.y,
            this.rampa.raio, 0.5 * Math.PI, Math.PI
        )
        ctx.stroke()

        // Desenhar a esfera
        let angulo = this.posicao.rampa / this.rampa.raio

        ctx.fillStyle = this.esfera.cor
        ctx.beginPath()
        ctx.arc(
            centroRampa.x - Math.cos(angulo) * this.rampa.raio + this.esfera.raio - 1,
            centroRampa.y + Math.sin(angulo) * this.rampa.raio - this.esfera.raio + 1,
            this.esfera.raio, 0, 2 * Math.PI
        )
        ctx.fill()
    }
}