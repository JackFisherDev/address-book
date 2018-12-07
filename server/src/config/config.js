const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'address-book',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '12345',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../address-book.sqlite'),
      operatorsAliases: false
    }
  },
  authentication: {
    jwtSecret: process.env.JWR_SECRER || 'secret'
  }
}
