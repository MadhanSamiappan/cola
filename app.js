const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());

app.get('/', (req, res) => {
  console.log(req.query);
  if (req.query.device === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGhhbnVzaCIsImlhdCI6MTY3OTQ2OTY3OX0.zbzyyzkiB0M0bUZs_ydjPaGpM2PbPbJ1cqi-PTLiS3c') {
    let data = JSON.stringify({
      "theme": {
        "role": "main"
      }
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://madhans-area-51.myshopify.com/admin/api/2023-01/themes/121517047870.json',
      headers: {
        'X-Shopify-Access-Token': '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',
        'Content-Type': 'application/json',
        'Cookie': '_secure_admin_session_id=0ee4728e993f9ea116f7dd25d1053bba; _secure_admin_session_id_csrf=0ee4728e993f9ea116f7dd25d1053bba'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  res.send('received da');
})

app.listen('8080', () => {
  console.log('server is up and running')
});

