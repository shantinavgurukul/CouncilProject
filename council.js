const express = require('express');
const mysql = require("mysql");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 9000;

const knex = require('knex')({
    client : 'mysql',
    connection : {
        host : 'localhost',
        user : 'root',
        password : "Shanti123#@!",
        database : 'student_details'
    }
})
knex.schema.hasTable('councilMembers').then( (exist) =>{
    if(!exist){
        return knex.schema.createTable('councilMembers',(tab) => {
            tab.increments("id").primary();
            tab.string('student_name'); 
            tab.string('Council_post');
            tab.integer('Council_Start_Date');
        })
    }
})

app.post('/addingData',(req,res) => {
    knex('councilMembers').insert({
        student_name : req.body.student_name,
        Council_post : req.body.Council_post,
        Council_Start_Date : req.body.Council_Start_Date
        })
        .then(() => {
            knex.select("*").from("councilMembers").then((data) => {
                console.log("created !!!");
                res.send(data)
            })
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

app.get('/DataGet',(req,res) => {
    knex.select('*').from('councilMembers').then((data) => {
        console.log(data);
        res.send(data)
    }).catch((err) => {
        res.send(err)
        console.log(err);
    })

})

//get data from ID:-
app.get('/get/:id',(req,res) => {
    var id = req.params.id
    knex.select('*').from('councilMembers').where('id',id)
    .then((data) => {
        res.send(data)
        console.log(data);
    }).catch((err) => {
        res.send(err)
        console.log(err);
    })

})

app.get('/getNmae/:student_name',(req,res) => {
    var student_name = req.params.student_name
    knex.select('*').from('councilMembers').where('student_name',student_name)
    .then((msg) => {
        res.send(msg)
        console.log(msg);


    }).catch((err) => {
        console.log(err);
        res.send(err)
    })
})
app.put('/update/:id',(req,res) => {
    knex.update({
        student_name : req.body.student_name,
        Council_post : req.body.Council_post,
        Council_Start_Date : req.body.Council_Start_Date

    })
    .table('councilMembers').where('id',req.params.id)
    .then(() => {
        res.send('data updating....')
        console.log("data updating....");
    })
    .catch((err) => {
        res.send(err)
    })
})

app.delete('/deletedata/:id',(req,res) => {
    knex('councilMembers')
    .where({'id':req.params.id}).del()
    .then(() => {
        res.send('user deleted!!')
        console.log("Deleted!!!!");
    })
    .catch((err) => {
        res.send(err)
    })
})


app.listen(port, () => {
    console.log('server started on port 9000')
})
