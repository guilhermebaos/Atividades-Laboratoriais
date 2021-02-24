// Montagem
export default class Montagem {
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
            posY: this.simula.altura * 0.6,
            altura: 20,
            largura: 0.85,              // Em proporção à largura do canvas
            cor: 'rgb(10, 100, 230)'
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

        }

        // Cores dos vetores
        this.corVetores = {
            velocidade: 'rgb(145, 200, 20)',
            aceleracao: 'rgb(250, 70, 10)',
        }

        // Multiplicador do tamanho dos vetores
        this.tamanhoVetor = 10
        
        this.reiniciar()
    }

    // Reiniciar a Bola
    reiniciar() {
        // Inputs
        this.g = this.simula.inputs.g
        this.m = this.simula.inputs.m
        this.mMax = this.simula.inputs.mMax
        this.mSusp = this.simula.inputs.mSusp
        this.mSuspMax = this.simula.inputs.mSuspMax
        this.hSusp = this.simula.inputs.hSusp
        this.hSuspMax = this.simula.inputs.hSuspMax
        this.fa = this.simula.inputs.fa

        // Valores Constantes

        // Cinemática inicial
    }

    update(deltaTempo) {
    }

    desenhar(ctx) {
    }
}