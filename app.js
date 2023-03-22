const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit')

const jwt = require('./utils/jwt')

require('dotenv').config()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)
app.use(cors())

app.get('/',(req,res)=>{
  res.send({status: 200, message: "Cola up and running 🚀"})
})

app.get('/api',async (req,res)=>{
    try {
      if(req.query['token']){
        let data = await jwt.validate(req.query['token'])
        console.log(data)
        res.send({status: 200})
      }else{
        throw new Error("missing token")
      }
    } catch (error) {
      res.status(400).send({status: 400, message: error.message})
    }
})

app.post('/api/sign', async(req,res)=>{
  try {
      if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        let token = req.headers.authorization.split(' ')[1]
        if(await jwt.validate(token)){
          let storeToken = await jwt.sign()
          res.send({ store: "store.myshopify.com", token: storeToken })
        }else{
          throw new Error("Invalid token") 
        }
      }else{
        throw new Error("Bearer token not found")
      } 
  } catch (error) {
    res.status(400).send({status: 400, message: error.message})
  }
})

app.listen('8080',()=>{
  console.log('server is up and running')
});