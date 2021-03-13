export default class Pendulo {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições da Bola
        this.raioPx = 10
        this.cor = 'rgb(255, 130, 35)'

        
        this.reiniciar()
    }

    reiniciar() {
        // Constantes
        this.m = this.simula.inputs.m
        this.mMax = this.simula.inputs.mMax
        this.v = this.simula.inputs.v
        this.a = this.simula.inputs.a
        this.h = this.simula.inputs.h
        this.lSim = this.simula.inputs.lSim
        this.g = this.simula.inputs.g

        // Conversões
        this.pxToM = this.lSim / this.simula.largura
        this.mToPx = this.simula.largura / this.lSim

        this.hSim = this.simula.altura * this.pxToM

        // Forças
        this.peso = this.m * this.g

        // Raio da Bola
        this.raio = this.raioPx * this.pxToM

        // Posição da Bola
        this.posicao = {x: this.raio, y: this.hSim - this.h - this.raio}

        this.velocidade = {x: this.v, y: 0, abs: 0}
    }

    update(deltaTempo) {
    }

    desenhar(ctx) {
        this.posicaoPx = {
            x: this.posicao.x * this.mToPx,
            y: this.posicao.y * this.mToPx
        }
        ctx.fillStyle = this.cor
        ctx.beginPath()
        ctx.arc(this.posicaoPx.x, this.posicaoPx.y, this.raioPx, 0, 2 * Math.PI)
        ctx.fill()
        console.log(this.raioPx)
    }
}