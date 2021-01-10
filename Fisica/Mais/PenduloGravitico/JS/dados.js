export default class Dados {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Tempo atual
        this.tempo = 0

        // Tempo até o qual vamos gravar dados, em ms
        this.tempoFinal = 10000

        // Objeto com os dados
        this.dadosObtidos = {
            tempo: [],
            ang: [],
            pos: [],
            posY: [],
            posX: [],
            vel: [],
            velX: [],
            velY: [],
            ace: [],
            aceX: [],
            aceY: [],
            jer: []
        }
        this.dadosEntregues = false
    }

    reiniciar() {
        // Apaga os dados gravados
        this.tempo = 0

        for (let key in this.dadosObtidos) {
            this.dadosObtidos[key] = []
        }

        this.dadosEntregues = false
    }

    update(deltaTempo) {
        // Já entregou os dados
        if (this.dadosEntregues) return false

        // Já gravou dados suficientes
        if (this.tempo > this.tempoFinal) {
            this.dadosEntregues = true
            return true
        }

        // Calcular e guardar os valores
        this.tempo += deltaTempo

        this.dadosObtidos.tempo.push((this.tempo / 1000).toFixed(3))

        this.dadosObtidos.ang.push(this.simula.inputs.ang * (180 / Math.PI))

        this.dadosObtidos.pos.push(((this.simula.pendulo.posicao.x - this.simula.pendulo.fioPos.x) ** 2 + (this.simula.altura - this.simula.pendulo.posicao.y) ** 2) ** 0.5)
        this.dadosObtidos.posX.push(this.simula.pendulo.posicao.x - this.simula.pendulo.fioPos.x)
        this.dadosObtidos.posY.push(this.simula.altura - this.simula.pendulo.posicao.y)

        this.dadosObtidos.vel.push(this.simula.pendulo.velocidade.abs)
        this.dadosObtidos.velX.push(this.simula.pendulo.velocidade.x)
        this.dadosObtidos.velY.push(this.simula.pendulo.velocidade.y)

        this.dadosObtidos.ace.push(this.simula.pendulo.aceleracao.abs)
        this.dadosObtidos.aceX.push(this.simula.pendulo.aceleracao.x)
        this.dadosObtidos.aceY.push(this.simula.pendulo.aceleracao.y)

        let aceLen = this.dadosObtidos.ace.length
        this.dadosObtidos.jer.push(
            (this.dadosObtidos.ace[aceLen - 1] - this.dadosObtidos.ace[aceLen - 2]) / deltaTempo
        )

        return false
    }
}