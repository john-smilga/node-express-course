const logger = (req, res, next)=>{
    const method = req.method
    console.log(method)
    next()
}

module.exports = logger