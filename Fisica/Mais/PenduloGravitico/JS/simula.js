import Pendulo from '../JS/pendulo.js'

const ESTADO_SIM = {
    EM_PROGRESSO: 0,
    MOVER_BOLA: 1
}

// Classe que vai executar a Simulação
export default class Simula {
    constructor(canvas) {
        this.canvas = canvas

        // Tamanho da Simulação
        this.novoTamanho()

        // Inputs usados para a Simulação
        this.inputs = this.juntarValores()

        // Estado da Simulação
        this.estado = ESTADO_SIM.EM_PROGRESSO

        // Objetos da Simulação
        this.pendulo = new Pendulo(this)

        this.simObjetos = [
            this.pendulo
        ]

        // Inputs usados para a Simulação
        this.inputs = this.juntarValores()
    }

    novoTamanho() {
        this.largura = this.canvas.width
        this.altura = this.canvas.height
    }

    // Juntar os valores para serem usados pela Simulação
    juntarValores() {
        return {
            massa: massaPendulo.value / 1000,           // Massa em kg
            comp: comprimentoFio.value,                 // Comprimento em mm
            ang: angMax.value / 10 * (Math.PI / 180),   // Ângulo em Radianos
            angSin: Math.sin(angMax.value / 10 * (Math.PI / 180)),
            angCos: Math.cos(angMax.value / 10 * (Math.PI / 180)),
            g: aGravitica.value / 100,                  // g em m/s^2
        }
    }

    update(deltaTempo) {
        if (this.estado !== ESTADO_SIM.EM_PROGRESSO) return

        this.simObjetos.forEach((objeto) => objeto.update(deltaTempo))
    }

    desenhar(ctx) {
        this.simObjetos.forEach((objeto) => objeto.desenhar(ctx))
    }
}