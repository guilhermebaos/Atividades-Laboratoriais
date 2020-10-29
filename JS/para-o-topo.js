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
    }


    // Voltar para o Topo
    function paraOTopo() {
        // Safari (o html smooth-scroll não funciona)
        if (document.body.scrollTop) {
            let docTopo = document.body.scrollTop
            let docStep = docTopo / 100
            let animTem = 0
            let tempo = 300

            function scrollStep(goTo) {
                window.scrollTop = goTo
            }

            let c = 0
            while (animTem <= tempo) {
                c += 1
                window.setTimeout(scrollStep, animTem, docTopo - docStep * c)
                animTem += tempo / 100
            }
        // Chrome, IE, Opera, etc.
        } else {
            document.documentElement.scrollTop = 0
        }
    }
}
