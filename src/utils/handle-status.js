module.exports = function handleStatus(fn) {
    return (req, res) => {
        const { url } = req
        if ('/status' === url) {
            res.writeHead(200)
            res.end('running')
            return
        }
        return fn(req, res)
    }
}