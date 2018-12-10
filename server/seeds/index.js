const {
  sequelize,
  // Group,
  User
} = require('../src/models')
const Promise = require('bluebird')
// const groups = require('./groups.json')
const users = require('./users.json')

sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(users.map(user => {
      User.create(user)
    }))
  })
