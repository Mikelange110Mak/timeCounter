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

app.post('/post_data', (req, res, next) => {
   let day = req.body.addDay
   let month = req.body.addMonth
   let year = req.body.addYear
   let time = req.body.addTime
   let rate = req.body.addRate
   const obj = { day, month, year, time, rate }
   console.log(obj);

   if (!day || !year || isNaN(+day) || isNaN(+time) || isNaN(+rate) || +day > 31 || +day < 1 || +time < 1) {
      res.send('Wrong Data')
   } else {
      res.send(obj)
      storage[year][month].push({ day: day, time: time, rate: rate })  //пушу новые данные в массив
      db.JSON(storage)  //кидаю их в хранилище
      db.sync();        //синхронизирую
      next()           //это чтобы нодмон не перезагружал страницу
   }
})


//Server run:
const port = 3000;
app.listen(port, () => {
   console.log(`App running on port ${port}...`);
})