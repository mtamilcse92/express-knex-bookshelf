var express = require('express');
var port = 3000;
var app = express();
var dbConfig = require('./dataBase/config');
var entity = require('./controllers/EntityController');
var fields = require('./controllers/FieldsController');

app.post('/entity', entity.create);
app.get('/entity/:id', entity.show);
app.put('/entity/:id', entity.update);
app.delete('/entity/:id', entity.delete);

app.post('/field', fields.create);
app.get('/field/:id', fields.show);
app.put('/field/:id', fields.update);
app.delete('/field/:id', fields.delete);

app.listen(port);
console.log("server is running...");