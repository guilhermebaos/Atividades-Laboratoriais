// Montagem única
export default class Montagem {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Várias escalas da Simulação
        this.escala = 100                   // De metros para cm

        // Definições da Rampa
        this.rampa = {
            largura: 10,
            curva: 0.4,                     // Parte do ecrã em que faz curva
            corSemFa: 'rgb(10, 100, 230)',
            corComFa: 'rgb(255, 130, 35)',
        }

        // Definições do Carrinho
        this.carrinho = {
            larguraMax: 100,
            alturaMax: 50,
            cor: 'rgb(255, 130, 35)',

            // Em função da largura do Carrinho
            razaoRaioRodas: 0.12,
            razaoDistRodas: 0.3,
            corRodas: 'black',
        }

        // Definições da Tira opaca
        this.tira = {
            razaoAltura: 0.60,
            cor: 'grey'
        }

        // Definições do laser
        this.laser = {
            raio: 2,
            cor: 'red'
        }

        // Valores máximos
        this.mMax = this.simula.inputs.mMax
        this.dMax = this.simula.inputs.dMax
        
        this.reiniciar()
    }

    // Reiniciar a Simulação
    reiniciar(start=false) {
        // Lançar o Carrinho
        this.start = start

        // Já devolveu o tempo de passagem pela célula
        this.devolveu = false

        // Altura Real da Simulação, em cm
        this.hSimCm = this.simula.inputs.dMax * 1

        // Conversões de Unidades
        this.cmToPx = this.simula.altura / this.hSimCm
        this.pxToCm = this.hSimCm / this.simula.altura

        // Inputs
        this.g = this.simula.constantes.g * this.escala
        this.m = this.simula.inputs.m
        this.d = this.simula.inputs.d
        this.a = this.simula.inputs.a
        this.fa = this.simula.inputs.fa * this.escala
        this.l = this.simula.inputs.l

        // Razões trignométricas do ângulo
        this.aTrig = {
            sin: Math.sin(this.a),
            cos: Math.cos(this.a),
            tan: Math.tan(this.a),
        }

        // Rampa
    }

    update(deltaTempo) {

    }

    desenhar(ctx) {
        
    }
}