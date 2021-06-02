const knex = require('knex')({
    client : 'mysql',
    connection : {
        host : 'localhost',
        user : 'root',
        password : "Shanti123#@!",
        database : 'student_details'
    }
})

knex.schema.hasTable('TrainingAndPlacement').then( (exits) =>{
    if(!exits){
        return knex.schema.createTable('TrainingAndPlacement',(tab) => {
            tab.increments("id").primary();
            tab.string('Name',20); 
            tab.string('Academic_details');
            tab.string('StudentProbleSolve');
            tab.string('Mentor');
            tab.string('English')
        })
    }
})
module.exports = knex;