// Montagem
export default class Montagem {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições do Plano Horizontal
        this.plano = {
            altura: 20,
            largura: 0.85,              // Em proporção à largura do canvas
            cor: 'rgb(10, 100, 230)'
        }

        // Definições do Carrinho
        this.carrinho = {
            larguraMax: 150,
            alturaMax: 75,
            cor: 'rgb(255, 130, 35)'
        }

        // Definições da Roldana
        this.roldana = {
            raio: 15,
            cor: 'black'
        }

        // Definições do Fio
        this.fio = {
            largura: 2,
            comprimento: 50,
            cor: 'black'
        }

        // Deginições do Recipiente
        this.corpoSuspenso = {
            larguraMax: 50,
            alturaMax: 25,
            cor: 'grey'
        }

        // Cores dos vetores
        this.corVetores = {
            velocidade: 'rgb(145, 200, 20)',
            aceleracao: 'rgb(250, 70, 10)',
        }

        // Valores máximos
        this.mMax = this.simula.inputs.mMax
        this.mSuspMax = this.simula.inputs.mSuspMax
        this.hSuspMax = this.simula.inputs.hSuspMax

        // Altura da Simulação
        this.hSimCm = this.hSuspMax * 1.5


        // Multiplicador do tamanho dos vetores
        this.tamanhoVetor = 10
        
        this.reiniciar()
    }

    // Reiniciar a Bola
    reiniciar() {
        // Conversões de Unidades
        this.cmToPx = this.simula.altura / this.hSimCm
        this.pxToCm = this.hSimCm / this.simula.altura


        // Inputs
        this.g = this.simula.inputs.g
        this.m = this.simula.inputs.m
        this.mSusp = this.simula.inputs.mSusp
        this.hSusp = this.simula.inputs.hSusp
        this.fa = this.simula.inputs.fa

        // Plano
        this.plano.posY = this.simula.altura * (1 - (this.hSuspMax + this.corpoSuspenso.alturaMax * this.pxToCm * 2) / this.hSimCm)

        // Carrinho
        this.carrinho.largura = this.carrinho.larguraMax * (this.m / this.mMax) ** (1/3)
        this.carrinho.altura = this.carrinho.alturaMax * (this.m / this.mMax) ** (1/3)

        // Corpo Suspenso
        this.corpoSuspenso.largura = this.corpoSuspenso.larguraMax * (this.mSusp / this.mSuspMax) ** (1/3)
        this.corpoSuspenso.altura = this.corpoSuspenso.alturaMax * (this.mSusp / this.mSuspMax) ** (1/3)

        this.corpoSuspenso.yInicial = this.simula.altura - this.hSusp * this.cmToPx - this.corpoSuspenso.altura

        // Valores Constantes
        this.xFimPlano = this.simula.largura * this.plano.largura

        // Cinemática inicial
        this.posicao = 0
        this.velocidade = 0
        this.aceleracao = 0
    }

    update(deltaTempo) {
    }

    desenhar(ctx) {
        // Desenhar o plano
        ctx.fillStyle = this.plano.cor
        ctx.fillRect(0, this.plano.posY, this.simula.largura * 0.85, this.plano.altura)

        // Desenhar o Carrinho no local indicado pela posição
        let xCarrinho = this.posicao
        let yCarrinho = this.plano.posY - this.carrinho.altura

        ctx.fillStyle = this.carrinho.cor
        ctx.fillRect(xCarrinho, yCarrinho, this.carrinho.largura, this.carrinho.altura)

        // Valores para o resto do Canvas
        xCarrinho += this.carrinho.largura / 2
        yCarrinho += this.carrinho.altura / 2

        let xRoldana = this.xFimPlano + this.roldana.raio
        let yRoldana = yCarrinho + this.roldana.raio

        // Desenhar a Roldana
        ctx.fillStyle = this.roldana.cor
        ctx.beginPath()
        ctx.arc(xRoldana, yRoldana, this.roldana.raio, 0, 2 * Math.PI)
        ctx.fill()

        // Unir a Roldana ao plano
        ctx.strokeStyle = this.fio.cor
        ctx.lineWidth = this.fio.largura
        ctx.beginPath()
        ctx.moveTo(xRoldana, yRoldana)
        ctx.lineTo(xRoldana - this.roldana.raio - 1, yRoldana - this.roldana.raio + this.carrinho.altura / 2 + 1)
        ctx.stroke()

        // Desenhar o Fio
        let xFimFio = xRoldana + this.roldana.raio
        let yFimFio = this.corpoSuspenso.yInicial + this.posicao * this.cmToPx

        ctx.strokeStyle = this.fio.cor
        ctx.lineWidth = this.fio.largura
        ctx.beginPath()
        ctx.moveTo(xCarrinho, yCarrinho)
        ctx.lineTo(xRoldana, yCarrinho)
        ctx.arc(xRoldana, yRoldana, this.roldana.raio, -0.5 * Math.PI, 0)
        ctx.moveTo(this.xFimPlano + 2 * this.roldana.raio, yRoldana)
        ctx.lineTo(xFimFio, yFimFio)
        ctx.stroke()

        // Desenhar o Corpo Suspenso
        let xCorpoSuspenso = xFimFio - this.corpoSuspenso.largura / 2
        let yCorpoSuspenso = yFimFio

        ctx.fillStyle = this.corpoSuspenso.cor
        ctx.fillRect(xCorpoSuspenso, yCorpoSuspenso, this.corpoSuspenso.largura, this.corpoSuspenso.altura)


        /*
        // Desenhar os vetores Velocidade e Aceleração

        if (this.velocidade != 0) {
            this.simula.desenharVetor(xCarrinho, yCarrinho - this.carrinho.altura, xCarrinho + this.velocidade * this.tamanhoVetor, yCarrinho - this.carrinho.altura, this.corVetores.velocidade)
        }
        if (this.aceleracao != 0) {
            this.simula.desenharVetor(xCarrinho, yCarrinho - this.carrinho.altura, xCarrinho + this.aceleracao * this.tamanhoVetor, yCarrinho - this.carrinho.altura, this.corVetores.aceleracao)
        }
        */
    }
}