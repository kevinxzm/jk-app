export function setToken(x) {
    localStorage.setItem('TOKENjkapp',x)
}

export function getToken() {
    return localStorage.getItem('TOKENjkapp')
}


export function removeToken() {
    localStorage.removeItem('TOKENjkapp')
}


export function ifToken() {
    return !!localStorage.getItem('TOKENjkapp')
}






