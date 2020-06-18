avoid = ['/navbar.html']

function redirect() {
    alert(window.location.pathname)
    if (avoid.includes(window.location.pathname)){
        window.location.pathname = '/index.html'
    }
}

window.onload = redirect()