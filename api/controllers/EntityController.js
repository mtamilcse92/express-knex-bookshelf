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
        new Entity({ name: 'New Entity' })
            .save().then(function(model) {
                console.log("inserted");
                res.send("entity create");
            });
    },

    show: function(req, res) {

        new Entity({ id: 1 })
        .fetch({ withRelated: ['fields'] }).then(function(model) {
            console.log(model.toJSON());
            res.json(model.toJSON());
        }).catch(function(err) {
            console.error(err);
        });

    },

    update: function(req, res) {
        new Entity({ 'id': 1 })
            .save({
                name: 'updated Entity'
            }).then(function(station) {
                res.json(station.toJSON());
            });
    },

    delete: function(req, res) {
        new Entity({ id: 1 })
            .destroy()
            .then(function(model) {
                res.json("deleted");
            });
    }

}
