const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/',(req,res)=>{
  console.log(req.query);
  res.send('received da');
})

app.listen('8080',()=>{
  console.log('server is up and running')
});

