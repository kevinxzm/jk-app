export function setToken(x) {
    localStorage.setItem('TOKENjkapp',x)
}


export function removeToken() {
    localStorage.removeItem('TOKENjkapp')
}


export function ifToken() {
    return !!localStorage.getItem('TOKENjkapp')
}






