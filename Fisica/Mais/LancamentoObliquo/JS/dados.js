export default class Dados {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Contador, para apenas guardar uma parte dos dados, para evitar sobrecarregar os gráficos
        this.contador = -1
        this.ignorarMin = 1
        this.ignorar = this.ignorarMin

        this.frames = velocidadeSim.value / 1

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

        // Ângulo entre a Velocidade e a Horizontal
        this.dadosObtidos.push(-Math.asin(this.esfera.velocidade.y / this.esfera.velocidade.abs) * 180 / Math.PI)

        // Energias Cinética, Potencial e Mecânica
        let Ec = 0.5 * this.esfera.m * (this.esfera.velocidade.abs ** 2)
        let Epg = this.esfera.m * this.esfera.g * this.esfera.altura
        this.dadosObtidos.push(Ec)
        this.dadosObtidos.push(Epg)
        this.dadosObtidos.push(Ec + Epg)

        // Posição
        this.dadosObtidos.push(this.esfera.posicao.x - this.esfera.raio)
        this.dadosObtidos.push(this.esfera.altura)

        // Velocidade
        this.dadosObtidos.push(this.esfera.velocidade.x)
        this.dadosObtidos.push(this.esfera.velocidade.y)
        this.dadosObtidos.push(this.esfera.velocidade.abs)
        
        // Calcular e guardar os valores
        this.tempo += deltaTempo * this.ignorar * this.simula.resolucao

        return this.dadosObtidos
    }
}