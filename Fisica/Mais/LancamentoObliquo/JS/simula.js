import Esfera from '../JS/esfera.js'
import Dados from '../JS/dados.js'

const ESTADOS = {
    EM_PROGRESSO: 0,
    PAUSA: 1
}

// Classe que vai executar a Simulação
export default class Simula {
    constructor(canvas, resolucao) {
        this.canvas = canvas

        // Resolução (Tamanho do deltaT) e Updates por Frame
        this.resolucao = resolucao

        // Tamanho da Simulação
        this.novoTamanho()

        // Inputs usados para a Simulação
        this.inputs = this.juntarValores()

        // Estado da Simulação
        this.estado = ESTADOS.EM_PROGRESSO

        // Objetos da Simulação
        this.esfera = new Esfera(this)

        this.simObjetos = [
            this.esfera
        ]

        this.dados = new Dados(this)
    }

    reiniciar() {
        this.inputs = this.juntarValores()
        this.esfera.reiniciar()
        this.dados.reiniciar()
    }

    novoTamanho() {
        this.largura = this.canvas.width
        this.altura = this.canvas.height
    }

    // Juntar os valores para serem usados pela Simulação
    juntarValores() {
        return {
            m: massaEsfera.value / 1000,                // Massa em kg
            mMax: massaEsfera.max / 1000,               // Massa máxima
            v: velInicial.value / 10,                   // Velocidade em m/s
            a: angLanc.value / 10 * (Math.PI / 180),    // Ângulo em Radianos
            h: hLanc.value / 10,                        // Altura em m
            lSim: larguraSim.value / 1,                 // Largura em m
            g: aGrav.value / 100                        // g em m/s^2
        }
    }

    pausa() {
        if (this.estado == ESTADOS.PAUSA) {
            this.estado = ESTADOS.EM_PROGRESSO
        } else {
            this.estado = ESTADOS.PAUSA
        }
    }

    update(deltaTempo) {
        if (this.estado !== ESTADOS.EM_PROGRESSO) return

        this.simObjetos.forEach((objeto) => objeto.update(deltaTempo))

        return this.dados.update(deltaTempo)
    }

    desenhar(ctx) {
        this.simObjetos.forEach((objeto) => objeto.desenhar(ctx))

        if (this.estado == ESTADOS.PAUSA) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
            ctx.fillRect(0, 0, this.largura, this.altura)
        }
    }
}