evitar = ['/Layout/navbar.html', '/Layout/footer.html', '/Layout/layout.html', '/Layout/menu.html']

// Redireciona o utilizador se ele abrir algum dos Layouts
function redirecionar() {
    if (evitar.includes(window.location.pathname)){
        window.location.pathname = '/index.html'
    }
}

window.onload = redirecionar()