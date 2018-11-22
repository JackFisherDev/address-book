module.exports = {
  db: {
    database: process.env.DB_NAME || 'address-book',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '12345',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './address-book.sqlite',
      operatorsAliases: false
    }
  },
  port: process.env.PORT || 8081
}
