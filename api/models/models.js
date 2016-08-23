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

module.exports = {
connection : connection,

Entity : bookShelf.Model.extend({
    tableName: 'entity',
    pages: function() {
        return this.hasMany(Fields);
        console.log("Entity");
    }
}),

Fields : bookShelf.Model.extend({
    tableName: 'fields',
    book: function() {
        return this.belongsTo(Entity);
        console.log("Fields");
    }
}),

}
