var express = require('express')
var app = express()
var usuarios = require('./routes/usuarios');
const mariadb = require('mariadb');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
var db = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'seq_db'
})

app.use('/api',usuarios);
app.use(express.json())
//app.use(bodyParser.json());



app.get('/', function (req, res) {
    res.send('holla mundo')
})



app.listen(3000);