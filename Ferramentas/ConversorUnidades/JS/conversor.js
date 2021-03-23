// Constantes



const alvoConversor = document.getElementById('alvo')
const divsGrandezas = document.getElementsByClassName('grandeza')


// Selecionar a Grandeza
function grandeza(nomeFicheiro='') {
    alvoConversor.setAttribute('incluir', nomeFicheiro)
    incluirHTML()
}
