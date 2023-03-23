const express = require("express");
const serverless = require("serverless-http");
const axios = require('axios').default;
// Create an instance of the Express app
const app = express();
// Create a router to handle routes
const router = express.Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
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
        res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // res.send('funcion exectued');
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);