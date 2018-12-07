const {
  sequelize,
  Group
} = require('../src/models')
const Promise = require('bluebird')
const groups = require('./groups.json')

sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(groups.map(group => {
      Group.create(group)
    }))
  })
