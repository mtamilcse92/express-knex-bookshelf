var connection = {
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '55555',
        database: 'casa'
    }
};
var knex = require('knex')(connection);
var bookShelf = require('bookshelf')(knex);

var Entity = bookShelf.Model.extend({
    tableName: 'entity',
    fields: function() {
        return this.hasMany(Fields);
    }
});

var Fields = bookShelf.Model.extend({
    tableName: 'fields',
    entity: function() {
        return this.belongsTo(Entity);
    }
});



module.exports = {


    create: function(req, res) {

        new Fields({ name: req.param('name'), type: req.param('type'), entity_id: req.param('entity_id')})
            .save().then(function(model) {
                console.log("inserted");
                res.json(model.toJSON());
            }).catch(function(err) {
                res.send(err);
            });
    },

    show: function(req, res) {
        var id = req.param('id');

        Fields.where({ id: id }).fetch().then(function(model) {
            console.log(model.toJSON());
            res.json(model.toJSON());
        }).catch(function(err) {
            res.send(err);
        });

    },

    update: function(req, res) {
        var id = req.param('id');

        new Fields({ id: id })
            .save({
                name: 'updated Fields',
                type: 'string'
            }).then(function(station) {
                res.json(station.toJSON());
            }).catch(function(err) {
                res.send(err);
            });
    },

    delete: function(req, res) {
        var id = req.param('id');

         Fields.where({ id: id }).destroy()
            .then(function(model) {
                res.json("deleted");
            }).catch(function(err) {
                res.send(err);
            });

    }

}

