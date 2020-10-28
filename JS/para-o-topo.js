// Selecionar o Butão
paraOTopoBtn = document.getElementById('para-o-topo')

if (screen && screen.width < 600) {
    // Verificar a posição da barra de navegação
    window.onscroll = scrollPos

    function scrollPos() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            paraOTopoBtn.style.display = 'block'
        } else {
            paraOTopoBtn.style.display = 'none'
            paraOTopoBtn.blur()
        }
        console.log('Oi')
    }


    // Voltar para o Topo
    function paraOTopo() {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
    }
}
