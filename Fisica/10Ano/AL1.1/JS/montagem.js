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
            fim: 0.9,                   // Posição x do início da rampa
            desfazamento: 0.1,
            cor: 'rgb(10, 100, 230)',   // em função do tamanho do canvas
        }

        // Definições do Carrinho
        this.carrinho = {
            largura: 200,
            altura: 100,
            cor: 'rgb(255, 130, 35)',
            corRodas: 'black',
        }
        
        this.reiniciar()
    }

    // Reiniciar a Simulação
    reiniciar() {
        // Altura Real da Simulação, em cm
        this.hSimCm = this.simula.inputs.dMax * 0.65

        // Conversões de Unidades
        this.cmToPx = this.simula.altura / this.hSimCm
        this.pxToCm = this.hSimCm / this.simula.altura

        // Inputs
        this.g = this.simula.inputs.g * this.escala
        this.m = this.simula.inputs.m
        this.mMax = this.simula.inputs.mMax
        this.d = this.simula.inputs.d
        this.dMax = this.simula.inputs.dMax
        this.a = this.simula.inputs.a
        this.fa = this.simula.inputs.fa
        this.l = this.simula.inputs.l

        // Razões trignométricas do ângulo
        this.aTrig = {
            sin: Math.sin(this.a),
            cos: Math.cos(this.a),
            tan: Math.tan(this.a),
        }

        // Rampa
        this.rampa.desfazamento *= this.simula.largura, // Ajusta a rampa ao ecrã
        this.rampa.fimPx = {
            x: this.rampa.fim * this.simula.largura + this.rampa.desfazamento * this.aTrig.cos,
            xReal: this.rampa.fim * this.simula.largura,
            y: this.simula.altura + this.rampa.desfazamento * this.aTrig.sin
        }
        this.rampa.inicioPx = {
            x: - this.rampa.desfazamento * this.aTrig.cos,
            y: this.simula.altura - this.aTrig.tan * this.simula.largura * this.rampa.fim - this.rampa.desfazamento * this.aTrig.sin,
        }

        // Carrinho
        this.carrinho.largura *= (this.m / this.mMax) ** (1/3)
        this.carrinho.altura *= (this.m / this.mMax) ** (1/3)
        
        this.carrinho.deltaX = this.carrinho.largura * this.aTrig.cos
        this.carrinho.deltaY = this.carrinho.largura * this.aTrig.sin

        // Cinética
        this.posicao = this.d
        this.velocidade = 0
        this.aceleracao = 0 // Alterar para a fixo
    }

    update(deltaTempo) {
    }

    desenhar(ctx) {
        // Plano Inclinado
        ctx.lineWidth = this.rampa.largura
        ctx.strokeStyle = this.rampa.cor
        ctx.beginPath()
        ctx.moveTo(this.rampa.inicioPx.x, this.rampa.inicioPx.y)
        ctx.lineTo(this.rampa.fimPx.x, this.rampa.fimPx.y)
        ctx.stroke()

        // Posição do carrinho
        this.posicaoPx = this.posicao * this.cmToPx + this.carrinho.largura / 2
        this.carrinho.x = this.rampa.fimPx.xReal - this.posicaoPx * this.aTrig.cos + this.aTrig.sin * (this.carrinho.altura / 2 + this.rampa.largura / 2)
        this.carrinho.y = this.simula.altura - this.posicaoPx * this.aTrig.sin - this.aTrig.cos * (this.carrinho.altura / 2 + this.rampa.largura / 2)

        this.carrinho.maxX = this.carrinho.x + this.carrinho.diagonal * this.aTrig.cos
        this.carrinho.maxY = this.carrinho.y + this.carrinho.diagonal * this.aTrig.sin

        // Desenhar o Carrinho no local indicado pela posição
        ctx.lineWidth = this.carrinho.altura
        ctx.strokeStyle = this.carrinho.cor
        ctx.beginPath()
        ctx.moveTo(this.carrinho.x, this.carrinho.y)
        ctx.lineTo(this.carrinho.x + this.carrinho.deltaX, this.carrinho.y + this.carrinho.deltaY)
        ctx.stroke()
        /*

        // Desenhar as rodas do carrinho
        ctx.fillStyle = this.carrinho.corRodas
        ctx.beginPath()
        ctx.arc(xCarrinho - this.carrinho.largura * this.carrinho.distRodas + this.carrinho.raioRodasPx, yCarrinho + this.carrinho.altura, this.carrinho.raioRodasPx, 0, 2 * Math.PI)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(xCarrinho + this.carrinho.largura * this.carrinho.distRodas - this.carrinho.raioRodasPx, yCarrinho + this.carrinho.altura, this.carrinho.raioRodasPx, 0, 2 * Math.PI)
        ctx.fill()

        // Desenhar o Vetor Velocidade do Carrinho
        if (this.velocidade != 0) {
            let posVetor = 0.8

            this.simula.desenharVetor(xCarrinho, yCarrinho * posVetor, xCarrinho + this.velocidade * this.tamanhoVetor, yCarrinho * posVetor, this.corVetores.velocidade)
        }
        */
    }
}