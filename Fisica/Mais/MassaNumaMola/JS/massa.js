export default class Massa {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições da Massa
        this.larguraPx = 140
        this.alturaPx = 80
        this.cor = 'rgb(255, 130, 35)'

        // Cores dos vetores
        this.corVetores = {
            velocidade: 'rgb(145, 200, 20)',
            aceleracao: 'black'
        }

        // Escala do ecrã, em relação ao tamanho máximo da mola
        this.escala = 6
        
        // Tamanho dos vetores
        this.tamanhoVetor = 0.1

        this.reiniciar()
    }

    reiniciar(start=false) {
        this.start = start

        // Constantes
        this.m = this.simula.inputs.m
        this.mMax = this.simula.inputs.mMax
        this.k = this.simula.inputs.k
        this.l = this.simula.inputs.l
        this.xI = this.simula.inputs.xInicial
        this.xImax = this.simula.inputs.xInicialMax
        this.g = this.simula.inputs.g
        
        // Conversões
        this.hSim = this.xImax * this.escala

        this.pxToM = this.hSim / this.simula.altura
        this.mToPx = this.simula.altura / this.hSim

        this.lSim = this.simula.largura * this.pxToM

        // Dinâmica inicial da massa
        this.posicao = this.xI
        this.velocidade = 0
        this.fe = - this.k *(this.posicao - this.l)
        this.aceleracao = (this.g + this.fe) / this.m

        this.posicaoEquilibrio = this.xI + this.g / this.k
    }

    update(deltaTempo) {
        if (!this.start) return

        this.posicao += this.velocidade * deltaTempo + 0.5 * this.aceleracao * deltaTempo ** 2
        this.velocidade += this.aceleracao * deltaTempo

        this.fe = - this.k *(this.posicao - this.l)
        this.aceleracao = (this.g + this.fe) / this.m

        // Passar para:
        // this.velocidade += -this.k * (this.posicao - this.posicaoEquilibrio) / this.m * deltaTempo
    }

    desenhar(ctx) {
        this.posicaoPx = this.posicao * this.mToPx

        ctx.fillStyle = this.cor
        ctx.fillRect(
            0.5 * (this.simula.largura - this.larguraPx),
            this.posicaoPx,
            this.larguraPx,
            this.alturaPx
            )
        
        /*
        if (this.velocidade.abs > 1e-03) {
            this.velocidadePx = {
                x: this.velocidade.x * this.mToPx * this.tamanhoVetor,
                y: this.velocidade.y * this.mToPx * this.tamanhoVetor
            }
            this.simula.desenharVetor(ctx, this.posicaoPx.x, this.posicaoPx.y - 3 * this.raioPx, this.posicaoPx.x + this.velocidadePx.x, this.posicaoPx.y - 3 * this.raioPx + this.velocidadePx.y, this.corVetores.velocidade)
        }
        */
    }
}