const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const offlineArray=[{key: 1, dateTime: "2023-04-07 18:44:51", description: "remaining offile cash", debits: 0, credits: 100,balance:100}];
const onlineArray=[{key: 1, dateTime: "2023-04-07 18:44:51", description: "remaining online cash", debits: 0, credits: 100,balance:100}]

app.get('/serverdata', (req, res) => {
  res.json({'offline_array':offlineArray,'online_array':onlineArray});
});

app.listen(4000, () => {
  console.log('App listening on port 4000!');
});
