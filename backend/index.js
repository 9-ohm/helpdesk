const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const { createLogger, format, transports } = require('winston');

const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

const port = 3001

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


app.use(cors())
app.use(express.json())

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'helpdesk'
})

app.get('/articles', (req, res) => {
    db.query('SELECT * FROM durablearticles', (error, results, fields) => {
        if (error) throw error
        if (results === undefined || results.length == 0) {
            logger.warn('Table is empty');
        } else {
            logger.info('Successful get all articles');
            res.send(results)
        }
    })
})

app.post('/addarticles', (req, res) => {
    let name = req.body.name
    let id = req.body.id
    let location = req.body.location
    let problem = req.body.problem

    db.query(
        "INSERT INTO durablearticles (name, id, location, problem) VALUES(?,?,?,?)",
        [name, id, location, problem], (error, results,) => {
            if (error) throw error;
            else {
                logger.info("sussessfuly added");
                return res.send("successfully added")
            }
        });
})

app.delete('/delarticles/:rid', (req, res) => {
    let rid = req.params.rid;
    db.query("DELETE FROM durablearticles WHERE durablearticles.rid = ?", [rid], (err, results) =>{
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    })
})

app.listen(port, () => {
    logger.info('Server is running on port ' + port)
})