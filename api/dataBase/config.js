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

bookShelf.knex.schema.hasTable('entity').then(function(exists) {
    if (!exists) {
        bookShelf.knex.schema.createTable('entity', function(table) {
            table.increments('id').primary();
            table.string('name');
        }).then(function(table) {
            console.log('created table :', 'entity');
        }).catch(function(err) {
            console.error(err);
        });
    }
});


bookShelf.knex.schema.hasTable('fields').then(function(exists) {
    if (!exists) {
        bookShelf.knex.schema.createTable('fields', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.string('type');
            table.integer('entity_id').references('entity.id');
        }).then(function(table) {
            console.log('created table :', 'fields');
        }).catch(function(err) {
            console.error(err);
        });
    }
});


module.exports = bookShelf;