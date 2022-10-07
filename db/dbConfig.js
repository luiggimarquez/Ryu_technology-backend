import knex from "knex";

const configMySql = {

    client: 'mysql',
    connection:{

        host:'localhost',
        user:'root',
        password:'Venezuela2022',
        database: 'knex_msql'
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