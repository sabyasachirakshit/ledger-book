const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const offlineArray=[];
const onlineArray=[];

app.get('/serverdata', (req, res) => {
  res.json({'offline_array':offlineArray,'online_array':onlineArray});
});

app.post('/write-online-array', (req, res) => {
    const data = req.body;
    onlineArray.push(data);
    res.json({ message: 'Online transaction Data received!' });
});

app.post('/write-offline-array', (req, res) => {
    const data = req.body;
    offlineArray.push(data);
    res.json({ message: 'Offline transaction Data received!' });
});

app.listen(4000, () => {
  console.log('App listening on port 4000!');
});
