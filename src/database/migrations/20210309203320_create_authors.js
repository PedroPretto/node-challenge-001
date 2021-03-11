
exports.up = function (knex) {
    return knex.schema.createTable('authors', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('picture').notNullable()
        table.bool('is_admin').notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('authors')
}
