exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary()
    table.varchar('first_name').notNullable().defaultTo('')
    table.varchar('last_name').notNullable().defaultTo('')
    table.varchar('email').notNullable().unique()
    table.specificType('hashed_password', 'char(60)').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
