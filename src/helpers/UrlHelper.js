export default {
    getQueryParameter(pname) {
        const url = window.location.href
        const name = pname.replace(/[[\]]/g, '\\$&')
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
        const results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
}
