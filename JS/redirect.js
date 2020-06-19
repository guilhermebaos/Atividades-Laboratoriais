avoid = ['/Layout/navbar.html', '/Layout/footer.html', '/Layout/layout.html']

function redirect() {
    if (avoid.includes(window.location.pathname)){
        window.location.pathname = '/index.html'
    }
}

window.onload = redirect()