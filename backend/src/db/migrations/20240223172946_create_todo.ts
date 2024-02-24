import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
}

exports.up = function(knex: Knex) {
    return knex.schema.createTable('to_do', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.boolean('status').notNullable().defaultTo(false);
    });   
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('to_do');
}