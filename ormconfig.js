/* eslint-disable */
const path = require('path')

const production = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrationsRun: true,
  entities: [
    path.join(__dirname, 'src', '**', 'entities', '*.ts')
  ],
  migrations: [
    path.join(__dirname, 'src', '**', 'migrations', '*.ts')
  ],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/entities"
  }
}

const development = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [
    path.join(__dirname, 'src', '**', 'entities', '*.ts')
  ],
  migrations: [
    path.join(__dirname, 'src', '**', 'migrations', '*.ts')
  ],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/entities"
  }
}

module.exports = process.env.IS_DEV ? development : production
