const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/Immortals-group7?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('Immortals are ready to roll !'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});