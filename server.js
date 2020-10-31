const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const budgetModel = require('./models/budget_schema.js')
const url = 'mongodb://localhost:27017/personal-budget';

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.json());

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
      .then(()=> {
        budgetModel.find({})
          .then((data) => {
            res.json(data)
            mongoose.connection.close();
          })
          .catch((connectionError) => {
            console.log(connectionError);
          });
      })
      .catch((connectionError) => {
        console.log(connectionError);
      });
  });
  
  app.post('/addBudget', (req, res) => {
     mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
     .then(()=> {
         var budgetItem = new budgetModel({
         title: req.body.title,
         budget: req.body.budget,
         color: req.body.color
       });
       budgetModel.insertMany(budgetItem)
        .then((data) => {
            res.json(data);
            mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError)
        });
     })
        .catch((connectionError) =>{
          console.log(connectionError)
        });
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });