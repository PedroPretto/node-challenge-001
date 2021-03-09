// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'challenge',
      user:     'postgres',
      password: 'postgres'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  }
};
