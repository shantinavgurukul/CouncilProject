const express = require('express');
const app = express();
app.use(express.json());
const port = 9000;

app.use('/',require('./get'))

app.listen(port, () => {
    console.log('server started on port 9000')
})
