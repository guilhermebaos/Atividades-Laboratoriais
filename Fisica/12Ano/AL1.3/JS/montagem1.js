// Montagem 1
export default class Montagem1 {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições do Carrinho
        this.carrinho = {
            posXi: 10,
            largura: 150 * (this.simula.inputs.m / this.simula.inputs.mMax) ** (1/3),
            altura: 75 * (this.simula.inputs.m / this.simula.inputs.mMax) ** (1/3),
            cor: 'rgb(255, 130, 35)'
        }

        // Definições do Plano Horizontal
        this.plano = {
            posY: 40,
            altura: 20,
            cor: 'rgb(10, 100, 230)'
        }
        
        // Definições do outro Carrinho
        this.outroCarrinho = {
            posXi: this.simula.largura / 2,
            largura: 150 * (this.simula.inputs.mOutro / this.simula.inputs.mOutroMax) ** (1/3),
            altura: 75 * (this.simula.inputs.mOutro / this.simula.inputs.mOutroMax) ** (1/3),
            cor: 'rgb(0, 120, 255)'
        }

        // Cores dos vetores
        this.corVetores = {
            velocidade: 'rgb(145, 200, 20)',
            aceleracao: 'rgb(250, 70, 10)'
        }

        // Multiplicador do tamanho dos vetores
        this.tamanhoVetor = 3
        
        this.reiniciar()
    }

    // Reiniciar a Bola
    reiniciar() {
        // Inputs
        this.m = this.simula.inputs.m
        this.vi = this.simula.inputs.vi
        this.mOutro = this.simula.inputs.mOutro

        // Cinemática inicial
        this.posicao = this.carrinho.posXi
        this.velocidade = this.vi
        this.colidiu = false
    }

    update(deltaTempo) {
        if (!this.colidiu && this.posicao + this.carrinho.largura >= this.outroCarrinho.posXi) {
            this.colidiu = true
            this.velocidade *= (this.m) / (this.m + this.mOutro)
        }

        this.posicao += this.velocidade * deltaTempo
    }

    desenhar(ctx) {
        // Desenhar o plano
        ctx.fillStyle = this.plano.cor
        ctx.fillRect(0, this.simula.altura - this.plano.posY, this.simula.largura, this.plano.altura)

        // Calcular as posições dos carrinhos
        let xCarrinho = this.posicao
        let yCarrinho = this.simula.altura - this.plano.posY - this.carrinho.altura
        
        let xOutroCarrinho
        if (this.colidiu) {
            xOutroCarrinho = this.posicao + this.carrinho.largura
        } else {
            xOutroCarrinho = this.outroCarrinho.posXi
        }
        let yOutroCarrinho = this.simula.altura - this.plano.posY - this.outroCarrinho.altura

        // Desenhar o Carrinho no local indicado pela posição
        ctx.fillStyle = this.carrinho.cor
        ctx.fillRect(xCarrinho, yCarrinho, this.carrinho.largura, this.carrinho.altura)
        
        
        // Desenhar o outro Carrinho no local indicado pela posição
        ctx.fillStyle = this.outroCarrinho.cor
        ctx.fillRect(xOutroCarrinho, yOutroCarrinho, this.outroCarrinho.largura, this.outroCarrinho.altura)

        // Ajustar as posições para o topo centro do bloco
        xCarrinho += this.carrinho.largura / 2
        
        xOutroCarrinho += this.outroCarrinho.largura / 2

        // Desenhar o Vetor Velocidade do Carrinho
        if (this.velocidade != 0) {
            let posVetor = 0.8

            this.simula.desenharVetor(xCarrinho, Math.min(yCarrinho, yOutroCarrinho) * posVetor, xCarrinho + this.velocidade * this.tamanhoVetor, Math.min(yCarrinho, yOutroCarrinho) * posVetor, this.corVetores.velocidade)
        }

        // Desenhar o vetor Velocidade do outro Carrinho
        if (this.colidiu && this.velocidade != 0) {
            let posVetor = 0.9

            this.simula.desenharVetor(xOutroCarrinho, yOutroCarrinho * posVetor, xOutroCarrinho + this.velocidade * this.tamanhoVetor, yOutroCarrinho * posVetor, this.corVetores.velocidade)
        }
    }
}