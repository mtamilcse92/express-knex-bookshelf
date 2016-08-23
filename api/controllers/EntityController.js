var connection = require('../models/models');
var knex = require('knex')(connection.connection);
var bookShelf = require('bookshelf')(knex);
var Entity = connection.Entity;
var Fields = connection.Fields;

module.exports = {

    create: function(req, res) {

        var value = req.param('name');
        new Entity({ name: value })
            .save().then(function(model) {
                console.log("inserted");
                res.json(model.toJSON());
            }).catch(function(err) {
                res.send(err);
            });
    },

    show: function(req, res) {

        var id = req.param('id');
        console.log(id);
        Entity.where({ id: id }).fetch({ withRelated: ['fields'] }).then(function(model) {
            console.log(model.toJSON());
            res.json(model.toJSON());
        }).catch(function(err) {
            res.send(err);
        });

    },

    update: function(req, res) {

        var id = req.param('id');
        new Entity({ 'id': id })
            .save({
                name: 'updated Entity'
            }).then(function(station) {
                res.json(station.toJSON());
            }).catch(function(err) {
                res.send(err);
            });
    },

    delete: function(req, res) {

        var id = req.param('id');
        Fields.where({ entity_id: id }).destroy().then(function(author) {
            new Entity({ id: id })
                .destroy()
                .then(function(model) {
                    res.json("deleted");
                }).catch(function(err) {
                    res.send(err);
                });
        });

    }

}
