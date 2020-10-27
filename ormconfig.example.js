module.exports = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'NdPaNgdJFku4Jvbu',
  database: 'terior_db',
  entities: ['dist/entities/**/*.entity.js'],
  migrations: ['dist/migrations/develop/**/*.js'],
  logging: true,
};
