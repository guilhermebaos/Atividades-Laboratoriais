import Montagem1 from '../JS/montagem1.js'
// import Dados from '../JS/dados.js'

const MONTAGENS = {
    M1: 1,
    M2: 2
}

// Classe que vai executar a Simulação
window.Simula = class Simula {
    constructor(canvas, resolucao, inputVariavel) {
        // Guardar o canvas
        this.canvas = canvas

        // Resolução (Tamanho do deltaT) e Updates por Frame
        this.resolucao = resolucao

        // Resolução (Tamanho do deltaT) e Updates por Frame
        this.inputVariavel = inputVariavel

        // Montagem
        this.montagem = MONTAGENS.M1

        // Tamanho da Simulação
        this.novoTamanho()

        // this.dados = new Dados(this)

        this.reiniciar()
    }

    // Reiniciar a Simulação
    reiniciar() {
        this.inputs = this.juntarValores()

        delete this.simObjetos

        this.simObjetos = []
        if (this.montagem = MONTAGENS.M1) {
            this.simObjetos.push(new Montagem1(this))
        } else if (this.montagem = MONTAGENS.M2) {
            this.simObjetos.push(new Montagem2(this))
        }

        // this.dados.reiniciar()
    }

    // Atualizar o tamanho do canvas
    novoTamanho() {
        this.largura = this.canvas.width
        this.altura = this.canvas.height
    }

    // Juntar os valores para serem usados pela Simulação
    juntarValores() {
        return {
            g: 9.81,                                                // Aceleração Gravítica
            m: massaBloco.value / 1000,                             // Massa do Bloco em kg
            cae: coefAtritoEstatico.value / 100,                          // Coeficiente de Atrito Estático
            cac: coefAtritoEstatico.value * coefAtritoCinetico.value / 10000    // Coeficiente de Atrito Cinético
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