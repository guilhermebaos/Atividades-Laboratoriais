// Montagem única
export default class Montagem {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Várias escalas da Simulação
        this.escala = 100                   // De metros para cm

        // Definições da Rampa
        this.rampa = {
            largura: 10,
            fim: 0.9,                   // Posição x do início da rampa,
            cor: 'rgb(10, 100, 230)',   // em função do tamanho do canvas
            desfazamento: 10,           // Move a rampa
        }
        
        
        this.reiniciar()
    }

    // Reiniciar a Bola
    reiniciar() {
        // Altura Real da Simulação, em cm
        this.hSimCm = this.simula.inputs.dMax * 2

        // Conversões de Unidades
        this.cmToPx = this.simula.altura / this.hSimCm
        this.pxToCm = this.hSimCm / this.simula.altura

        // Inputs
        this.g = this.simula.inputs.g * this.escala
        this.d = this.simula.inputs.d
        this.a = this.simula.inputs.a
        this.fa = this.simula.inputs.fa
        this.l = this.simula.inputs.l

        // Rampa
        this.rampa.fimPx = this.rampa.fim * this.simula.largura
        this.rampa.inicioPx = this.simula.altura - Math.tan(this.a) * this.rampa.fimPx

        console.log(this.rampa.inicioPx)
        console.log(this.rampa.fimPx)
    }

    update(deltaTempo) {
    }

    desenhar(ctx) {
        // Plano Inclinado
        ctx.lineWidth = this.rampa.largura
        ctx.strokeStyle = this.rampa.cor
        ctx.beginPath()
        ctx.moveTo(-this.rampa.desfazamento, this.rampa.inicioPx + this.rampa.desfazamento)
        ctx.lineTo(this.rampa.fimPx - this.rampa.desfazamento, this.simula.altura + this.rampa.desfazamento)
        ctx.stroke()
    }
}