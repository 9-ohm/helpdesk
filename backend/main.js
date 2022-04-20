const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const { createLogger, format, transports } = require('winston');

const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}))

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    new transports.File({ filename })
  ]
});

let dbCon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:  'helpdesk'
})
dbCon.connect();

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/articles',(req, res) => {
  dbCon.query('SELECT * FROM durablearticles',(error, results, fields)=>{
    if(error) throw error

    let massages =""
    if(results === undefined || results.length == 0){
      logger.warn('Table is empty');
    }else {
      logger.info('Successful get all articles');
    }
    
    res.send({error: false, data: results})
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})