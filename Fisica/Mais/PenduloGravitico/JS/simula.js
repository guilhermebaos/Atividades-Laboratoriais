import Bola from '../JS/bola.js'

const ESTADO_SIM = {
    EM_PROGRESSO: 0,
    MOVER_BOLA: 1
}

// Classe que vai executar a Simulação
export default class Simula {
    constructor(LARGURA_SIM, ALTURA_SIM) {
        // Tamanho da Simulação
        this.largura = LARGURA_SIM
        this.altura = ALTURA_SIM

        // Inputs usados para a Simulação
        this.inputs = this.juntarValores()

        // Estado da Simulação
        this.estado = ESTADO_SIM.EM_PROGRESSO

        // Objetos da Simulação
        this.bola = new Bola(this)

        this.simObjetos = [
            this.bola
        ]

        // Inputs usados para a Simulação
        this.inputs = this.juntarValores()
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