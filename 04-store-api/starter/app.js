require("dotenv")
const express = require("express")
const app = express()
const port = 5000
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require("./middleware/error-handler")
// const port = process.env.PORT || 5000
app.use(express.json())
app.get('/',(req,res)=>{
	res.send('<h1>store api</h1><a href="/api/v1/task">click here</a>')
})
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const start = async()=>{
	try{
		app.listen(port,console.log(`connected on ${port}...`))
	}catch(error){
		console.log(error)
	}
}
start()