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


	create:function (req,res) {
	 	new Fields({ name: 'Next Fields', type:'string', entity_id: 1})
            .save().then(function(model) {
                console.log("inserted");
                res.json(model.toJSON());
            });
	 },

	 show:function (req,res) {
	 	new Fields({ 'id': '1' })
            .fetch()
            .then(function(model) {
                console.log(model.get('name'));
                res.json(model.toJSON());
            });
	 },

	 update:function (req,res) {
	 	 new Fields({ 'id': 1 })
            .save({
                name: 'updated Fields', 
                type:'string'
            }).then(function(station) {
                res.json(station.toJSON());
            });
	 },

	 delete:function (req,res) {
	 	new Fields({ id: 1 })
            .destroy()
            .then(function(model) {
                res.json("deleted");
            });
	 }

}