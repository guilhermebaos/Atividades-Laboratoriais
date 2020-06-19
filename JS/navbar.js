function showDropdown(divId) {
    let links = document.getElementById(divId).childNodes
    for(let c=0; c < links.length; c++) {
        if (links[c].nodeName.toLowerCase() == 'a') {
            links[c].style.display = 'block'
        }
    }
}

function hideDropdown(divId) {
    let links = document.getElementById(divId).childNodes
    for(let c=0; c < links.length; c++) {
        if (links[c].nodeName.toLowerCase() == 'a') {
            links[c].style.display = 'none'
        }
    }
}