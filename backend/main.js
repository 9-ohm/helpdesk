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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})