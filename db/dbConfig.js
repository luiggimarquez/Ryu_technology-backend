import knex from "knex";

const configMySql = {

    client: 'mysql',
    connection:{

        host:'localhost',
        user:'root',
        password:'12345',
        database: 'knex_mysql'
    }
}

const configSqlite3 = {

    client:'sqlite3',
    connection:{

        filename: './db/ecommerce'

    },

    useNullAsDefault: true
}

export const dbMySql = knex(configMySql)
export const dbSqlite = knex(configSqlite3)