export default class Dados {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Contador, para apenas guardar uma parte dos dados, para evitar sobrecarregar os gráficos
        this.contador = -1
        this.ignorarMin = 1
        this.ignorar = this.ignorarMin

        // this.frames = velocidadeSim.value / 1
        this.frames = 1

        // Tempo atual
        this.tempo = 0

        // Selecionar a esfera
        this.esfera = this.simula.esfera
    }

    reiniciar() {
        // Apaga os dados gravados
        this.contador = -1
        this.tempo = 0
        this.ignorar = this.ignorarMin + Math.ceil(this.frames)
    }

    update(deltaTempo) {
        // Gravar apenas uma parte dos dados, para evitar ficar com muitos pontos
        this.contador++

        if (this.contador % (this.ignorar * this.simula.resolucao) != 0) return false

        // Objeto com os dados
        this.dadosObtidos = []
        
        this.dadosObtidos.push(this.tempo.toFixed(3))
        
        // Calcular e guardar os valores
        this.tempo += deltaTempo * this.ignorar * this.simula.resolucao

        return this.dadosObtidos
    }
}