const explicacao = document.getElementsByName('explicação')

const unidadesDeExtensoPot = document.getElementsByName('unidadesDeExtensoPot')
const unidadesDeExtensoTempo = document.getElementsByName('unidadesDeExtensoTempo')
const unidadesParaExtensoPot = document.getElementsByName('unidadesParaExtensoPot')
const unidadesParaExtensoTempo = document.getElementsByName('unidadesParaExtensoTempo')

const razaoEnergia = document.getElementsByName('razaoEnergia')
const razaoPot = document.getElementsByName('razaoPot')
const razaoTempo = document.getElementsByName('razaoTempo')


let r, rInv
// Converter Energias
function energia(novasUnidades=false, inverterConversao=false) {
    if (novasUnidades) {
        explicacao.forEach(e => e.style.display = 'none')

        // Obter as Unidades
        let uDe = converterDe.value
        let uPara = converterPara.value

        let uDePot, uDeTempo, potDe, tempoDe
        let uDeDividido = uDe.split('W')
        if (uDeDividido.length == 2) {
            uDePot = uDeDividido[0] + 'W'
            uDeTempo = uDeDividido[1]

            potDe = new BigNumber(potencias[uDePot])
            tempoDe = new BigNumber(tempos[uDeTempo])

            textoArr(unidadesDeExtensoPot, potenciasNomes[uDePot])
            textoArr(unidadesDeExtensoTempo, temposNomes[uDeTempo])
        }

        let uParaPot, uParaTempo, potPara, tempoPara
        let uParaDividido = uPara.split('W')
        if (uParaDividido.length == 2) {
            uParaPot = uParaDividido[0] + 'W'
            uParaTempo = uParaDividido[1]

            potPara = new BigNumber(potencias[uParaPot])
            tempoPara = new BigNumber(tempos[uParaTempo])

            textoArr(unidadesParaExtensoPot, potenciasNomes[uParaPot])
            textoArr(unidadesParaExtensoTempo, temposNomes[uParaTempo])
        }

        if (potDe && potPara) {
            let rPot = potDe.dividedBy(potPara)
            let rTempo = tempoDe.dividedBy(tempoPara)

            textoArr(razaoPot, base10HTML(rPot))
            textoArr(razaoTempo, base10HTML(rTempo))

            explicacao[1].style.display = 'initial'

        } else if (potDe) {
            potPara = new BigNumber(1)
            tempoPara = new BigNumber(1)

            let rPot = potDe.dividedBy(potPara)
            let rTempo = tempoDe.dividedBy(tempoPara)

            textoArr(razaoPot, base10HTML(rPot))
            textoArr(razaoTempo, base10HTML(rTempo))

            explicacao[3].style.display = 'initial'

        } else if (potPara) {
            potDe = new BigNumber(1)
            tempoDe = new BigNumber(1)

            let rPot = potDe.dividedBy(potPara)
            let rTempo = tempoDe.dividedBy(tempoPara)

            textoArr(razaoPot, base10HTML(rPot))
            textoArr(razaoTempo, base10HTML(rTempo))

            explicacao[2].style.display = 'initial'

        } else {
            explicacao[0].style.display = 'initial'
        }


        // Escrever o símbolo das unidades
        textoArr(unidadesDe, uDe)
        textoArr(unidadesPara, uPara)
        
        // Escrever o nome das unidades por extenso
        textoArr(unidadesDeExtenso, energiasNomes[uDe])
        textoArr(unidadesParaExtenso, energiasNomes[uPara])

        // Escrever as razões
        let valorDe = new BigNumber(energias[uDe])
        let valorPara = new BigNumber(energias[uPara])

        r = valorDe.dividedBy(valorPara)
        rInv = valorPara.dividedBy(valorDe)

        textoArr(razao1, base10HTML(r))
    }

    if (inverterConversao) {
        converterNum.value = expToDec(new BigNumber(converterResultado.value).times(rInv))
        return
    }
    converterResultado.value = expToDec(new BigNumber(converterNum.value).times(r))
}