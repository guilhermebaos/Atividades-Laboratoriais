export default class Bola {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições da Bola
        this.bola = {
            cor: 'rgb(255, 130, 35)'
        }

        // Lasers
        this.lasers = {
            largura: 2,
            cor:'red'
        }

        // Escala (agora, de cm para metros)
        this.escala = 100
        
        this.reiniciar()
    }

    // Reiniciar a Bola
    reiniciar() {
        this.hSimCm = this.simula.inputs.hSimCm

        // Conversões de Unidades
        this.cmToPx = this.simula.altura / this.hSimCm
        this.pxToCm = this.hSimCm / this.simula.altura


        // Constantes
        this.m = this.simula.inputs.m
        this.r = this.simula.inputs.r
        this.rMax = this.simula.inputs.rMax
        this.d = this.simula.inputs.d
        this.g = this.simula.inputs.g

        // Bola
        this.bola.raio = this.r * this.cmToPx

        // Lasers
        this.lasers.pos1 = this.rMax * 2 * this.cmToPx
        this.lasers.pos2 = this.lasers.pos1 + this.d * this.cmToPx 

        // Cinética
        this.posicao = {
            x: this.simula.largura / 2,
            y: this.rMax * 2 - this.r
        }
        this.velocidade = 0
        this.aceleracao = this.g * this.escala
    }

    update(deltaTempo) {
    }

    desenhar(ctx) {
        // Desenhar os lasers
        ctx.fillStyle = this.lasers.cor
        ctx.fillRect(0, this.lasers.pos1, this.simula.largura, this.lasers.largura)
        ctx.fillRect(0, this.lasers.pos2, this.simula.largura, this.lasers.largura)

        // Desenhar a Esfera
        ctx.fillStyle = this.bola.cor
        ctx.beginPath()
        ctx.arc(
            this.posicao.x,
            this.posicao.y * this.cmToPx,
            this.bola.raio,
            0, 2 * Math.PI
        )
        ctx.fill()
    }
}