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
            ang: []
        }
        this.dadosEntregues = false
    }

    reiniciar() {
        // Apaga os dados gravados
        this.tempo = 0

        for (let key in this.dadosObtidos) {
            this.dadosObtidos[key] = []
        }
    }

    update(deltaTempo) {
        if (this.dadosEntregues) return false
        if (this.tempo > this.tempoFinal) {
            this.dadosEntregues = true
            return true
        }

        this.tempo += deltaTempo

        this.dadosObtidos.tempo.push((this.tempo / 1000).toFixed(3))
        this.dadosObtidos.ang.push(this.simula.inputs.ang * (180 / Math.PI))

        return false
    }
}