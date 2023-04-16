const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/serverdata', (req, res) => {
  let onlineArray = [];
  let offlineArray = [];
  fs.readFile("online_data.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      onlineArray = JSON.parse(data);
      fs.readFile("offline_data.json", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          if(data){
            offlineArray = JSON.parse(data);
          }
          else{
            offlineArray=[];
          }
          res.json({'offline_array':offlineArray,'online_array':onlineArray});
        }
      });
    }
  });
});

app.post('/write-online-array', (req, res) => {
  const data = req.body;
  fs.readFile("online_data.json", (err, fileData) => {
      if (err) {
          console.log(err);
      } else {
          let onlineArray = JSON.parse(fileData);        
          onlineArray.push(data);
          fs.writeFile("online_data.json", JSON.stringify(onlineArray), (err) => {
              if (err) {
                  console.log(err);
              } else {                 
                  res.json({ message: 'Online transaction Data received!' });
              }
          });
      }
  });
});


app.post('/write-offline-array', (req, res) => {
  const data = req.body;
  fs.readFile("offline_data.json", (err, fileData) => {
      if (err) {
          console.log(err);
      } else {
          let offlineArray = JSON.parse(fileData);
          offlineArray.push(data);
          fs.writeFile("offline_data.json", JSON.stringify(offlineArray), (err) => {
              if (err) {
                  console.log(err);
              } else {
                  res.json({ message: 'Offline transaction Data received!' });
              }
          });
      }
  });
});

app.listen(4000, () => {
  console.log('App listening on port 4000!');
});
