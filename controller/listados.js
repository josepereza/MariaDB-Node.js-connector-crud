const express = require("express");

const router = express.Router();
const mariadb = require('mariadb');
var db = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'seq_db'
})

exports.listado = (req, res) => {
    db.then(conn => {
        conn.query("select * from Usuarios")
            .then(rows => {
                res.json(rows)

            })
    })
};

exports.buscar = (req, res) => {
    busqueda = req.params.busqueda;
    busqueda = '%' + busqueda + '%';
    db.then(conn => {
        conn.query("select * from Usuarios where nombre like ?", [busqueda])
            .then(rows => {
                res.json(rows)

            })
    })
};

exports.crear=  (req, res) => {
    
   var nombre=req.body.nombre;
   var poblacion=req.body.poblacion;
   var saldo=req.body.saldo

   
    db.then(conn => {
    conn.query("insert into Usuarios(nombre,poblacion,saldo) values(?,?,?)", [nombre,poblacion,saldo])
        .then(rows => {
            res.json('registro insertado')

        })
})
      
  };


  exports.borrar = (req, res) => {
    borrar = req.params.borrar;
   
    db.then(conn => {
        conn.query("delete from Usuarios where id = ?", [borrar])
            .then(rows => {
                res.json('registro borrado')

            })
            .catch(error => res.json(error));
    })
};


exports.modificar=  (req, res) => {
    const modificar = req.params.modificar;
    var nombre=req.body.nombre;
    var poblacion=req.body.poblacion;
    var saldo=req.body.saldo
    db.then(conn => {
     conn.query("update  Usuarios set nombre=?,poblacion=?,saldo=? where id=?",[nombre,poblacion,saldo,modificar])
         .then(rows => {
             res.json('registro modificado')
 
         })
 })
       
   };
 