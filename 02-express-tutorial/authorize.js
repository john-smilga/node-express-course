 const authorize = (req, res, next)=>{
    
    // query string
    const {user} = req.query
    if (user == 'john'){
      req.user = {name: 'john', id:3}

      next()
    }
    else{
        res.status(401).send('Unauthorized access')
    }
 }

 module.exports = authorize