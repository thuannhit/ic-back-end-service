//Development environment
const moduleConfig = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: process.env.DB_CHARSET,
  logging: process.env.DB_LOGGING,
  migrationsTableName: 'system_migrations',
  entities: [
    "dist/models/entities/**/*.js"
  ],
  migrations: [
    "dist/migrations/**/*.js"
  ],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations"
  }
};

module.exports = moduleConfig;
