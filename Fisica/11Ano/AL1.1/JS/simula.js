import Bola from '../JS/bola.js'
import Dados from '../JS/dados.js'

// Classe que vai executar a Simulação
window.Simula = class Simula {
    constructor(canvas, resolucao) {
        // Guardar o canvas
        this.canvas = canvas

        // Resolução (Tamanho do deltaT) e Updates por Frame
        this.resolucao = resolucao

        // Inputs usados para a Simulação
        this.inputs = this.juntarValores()

        // Objetos da Simulação
        this.bola = new Bola(this)

        // Dados da Simulação
        this.dados = new Dados(this)

        // Tamanho da Simulação
        this.novoTamanho()
    }

    // Reiniciar a Simulação
    reiniciar() {
        this.inputs = this.juntarValores()
        this.bola.reiniciar()
        this.dados.reiniciar()
    }

    // Atualizar o tamanho do canvas
    novoTamanho() {
        this.largura = this.canvas.width
        this.altura = this.canvas.height

        this.reiniciar()
    }

    // Juntar os valores para serem usados pela Simulação
    juntarValores() {
        return {
            m: massaEsfera.value / 1000,    // Massa da bola, kg
            r: raioEsfera.value / 10,       // Raio da Esfera, cm
            rMax: raioEsfera.max / 10,      // Raio Máximo da Esfera, cm
            d: distCelulas.value / 1,       // Distância entre as Células
            hSimCm: (distCelulas.max / 1 + raioEsfera.max / 10) * 1.1, // Altura da Simulação
            g: 9.81                         // Aceleração Gravítica
        }
    }

    update(deltaTempo) {
        if (this.acabou) return

        deltaTempo /= 1000
        deltaTempo /= this.resolucao

        let dados = this.dados.update(deltaTempo)

        this.bola.update()

        if (dados) {
            return this.dados.dadosObtidos
        } else {
            return false
        }
    }

    desenhar(ctx) {
        this.bola.desenhar(ctx)
    }
}