exports.up = function(knex) {
    return knex.schema.createTable('articles', function(table) {
        table.increments('id').primary()

        table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('articles')
        .onDelete('SET NULL')
        .index()

        table.string('category')
        table.string('title')
        table.string('summary')
        table.string('first_paragraph')
        table.text('body')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('articles')
}
