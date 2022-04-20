const express = require('express')
const mysql = require('mysql')


const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

let dbCon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:  'helpdesk'
})
dbCon.connect();

app.get('/staffs',(req, res) => {
  dbCon.query('SELECT * FROM staffs',(error, results, fields)=>{
    if(error) throw error

    let massages =""
    if(results === undefined || results.length == 0){
      logger.warn('Staff table is empty');
    }else {
      logger.info('Successful get all staff');
    }
    
    res.send({error: false, data: results})
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})