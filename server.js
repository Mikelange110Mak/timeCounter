const express = require('express')
const app = express();
const JSONdb = require('simple-json-db');
const bodyParser = require('body-parser')

app.use(express.urlencoded({ extended: false }))
app.use(express.static('front'))
app.use(bodyParser.json());

const db = new JSONdb('db.json'); //Получаю JSON файлик
const storage = db.JSON()



app.post('/get_data', (req, res) => {
   const { year, month } = req.body
   res.send(storage[year][month])
})

app.post('/post_data', (req, res) => {
   let day = req.body.addDay
   let month = req.body.addMonth
   let year = req.body.addYear
   let time = req.body.addTime
   let rate = req.body.addRate
   const obj = { day, month, year, time, rate }
   console.log(obj);
   res.send(obj)
})


//Server run:
const port = 3000;
app.listen(port, () => {
   console.log(`App running on port ${port}...`);
})