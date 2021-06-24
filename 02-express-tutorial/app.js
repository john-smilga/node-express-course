const express=require('express')
const app = express();
const path = require('path');
app.use(express.static('./public'));
app.get('/',(req, res) =>{
    res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'));
})

app.all('*',(req,res)=>{
    res.status(404).send('<h1>Resource not found</h1>')
})
app.listen(5000)