// Montagem 1
export default class Montagem1 {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições do Bloco
        this.bloco = {
            posXi: 1000,
            largura: 150 * (this.simula.inputs.m / 2) ** (1/3),
            altura: 75 * (this.simula.inputs.m / 2) ** (1/3),
            cor: 'rgb(255, 130, 35)'
        }

        // Definições do Plano Horizontal
        this.plano = {
            posY: 40,
            altura: 20,
            cor: 'rgb(10, 100, 230)'
        }

        // Zoom Out
        this.zoomOut = 100
        
        this.reiniciar()
    }

    // Reiniciar a Bola
    reiniciar() {
        // Inputs
        this.g = this.simula.inputs.g
        this.m = this.simula.inputs.m
        this.cae = this.simula.inputs.cae
        this.cac = this.simula.inputs.cac

        // Valores Constantes
        this.normal = this.m * this.g
        this.faemax = this.normal * this.cae
        this.fac = this.normal * this.cac

        // Cinemática inicial
        this.posicao = this.bloco.posXi
        this.velocidade = 0
        this.aceleracao = 0
    }

    update(deltaTempo) {
        this.forca = this.simula.inputVariavel.intForca.value / 100

        if (this.velocidade < 0) {
            this.velocidade = 0
        }
        if (this.aceleracao < 0) {
            this.aceleracao = 0
        }

        if (this.velocidade > 0) {
            this.fr = this.forca - this.fac
        } else if (this.forca <= this.faemax) {
            this.fr = 0
        } else {
            this.fr = this.forca - this.faemax
        }

        this.aceleracao = this.fr / this.m

        this.posicao += this.velocidade * deltaTempo + 0.5 * this.aceleracao * deltaTempo ** 2

        this.velocidade += this.aceleracao

    }

    desenhar(ctx) {
        // Desenhar o plano
        ctx.fillStyle = this.plano.cor
        ctx.fillRect(0, this.simula.altura - this.plano.posY, this.simula.largura, this.plano.altura)

        // Desenhar o Bloco no local indicado pela posição
        ctx.fillStyle = this.bloco.cor
        ctx.fillRect(this.posicao / this.zoomOut, this.simula.altura - this.plano.posY - this.bloco.altura, this.bloco.largura, this.bloco.altura)
    }
}