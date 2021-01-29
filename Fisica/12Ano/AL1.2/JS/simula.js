/*
import Bola from '../JS/bola.js'
import Dados from '../JS/dados.js'
*/

const MONTAGENS = {
    M1: 1,
    M2: 2
}

// Classe que vai executar a Simulação
window.Simula = class Simula {
    constructor(canvas, resolucao) {
        // Guardar o canvas
        this.canvas = canvas

        // Resolução (Tamanho do deltaT) e Updates por Frame
        this.resolucao = resolucao

        // Tamanho da Simulação
        this.novoTamanho()

        // Inputs usados para a Simulação
        this.inputs = this.juntarValores()

        this.simObjetos = [
        ]

        // this.dados = new Dados(this)
    }

    // Reiniciar a Simulação
    reiniciar() {
        this.inputs = this.juntarValores()
        this.simObjetos.forEach((objeto) => objeto.reiniciar())
        this.dados.reiniciar()
    }

    // Atualizar o tamanho do canvas
    novoTamanho() {
        this.largura = this.canvas.width
        this.altura = this.canvas.height
    }

    // Juntar os valores para serem usados pela Simulação
    juntarValores() {
        return {
            m: massaBloco.value / 1000,                             // Massa do Bloco em kg
            cae: coefAtritoEstatico / 100,                          // Coeficiente de Atrito Estático
            cac: coefAtritoEstatico * coefAtritoCinetico / 10000    // Coeficiente de Atrito Cinético
        }
    }

    update(deltaTempo) {
        deltaTempo /= 1000
        deltaTempo /= this.resolucao

        // let dados = this.dados.update(deltaTempo)
        let dados = false

        this.simObjetos.forEach((objeto) => objeto.update(deltaTempo))

        if (dados) {
            return this.dados.dadosObtidos
        } else {
            return false
        }
    }

    desenhar(ctx) {
        this.simObjetos.forEach((objeto) => objeto.desenhar(ctx))
    }
}