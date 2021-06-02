const express = require('express')
const router = express.Router();
const knex = require('./connection_table')

router.get('/DataGet',(req,res) => {
    knex.select('*').from('TrainingAndPlacement').then((data) => {
        console.log(data);
        res.send(data)
    }).catch((err) => {
        res.send(err)
        console.log(err);
    })

})

//get data from ID:-

router.get('/get/:id',(req,res) => {
    var id = req.params.id
    knex.select('*').from('TrainingAndPlacement').where('TrainingAndPlacement.Id'.id)
    .then((data) => {
        res.send(data)
        console.log(data);
    }).catch((err) => {
        res.send(err)
        console.log(err);
    })

})

router.get('/getNmae/:id',(req,res) => {
    var id = req.params.id
    knex.select('Name').from('TrainingAndPlacement').where('TrainingAndPlacement.Id'.id)
    .then((name) => {
        var name = name[0].Name
        console.log(name.length)
        res.send(name.length)

    }).catch((err) => {
        console.log(err);
        res.send(err)
    })
})

module.express = router;
