const { Contact } = require('../models')

module.exports = {
  async getAllContacts (req, res) {
    try {
      const contacts = await Contact.findAll({
        where: {}
      })
      res.send(contacts)
    } catch (e) {
      console.log('bratann', e)
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to fetch songs.'
      })
    }
  },

  async createContact (req, res) {
    try {
      const contact = await Contact.create(req.body)
      res.send(contact)
    } catch (e) {
      console.log('bratann', e)
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to create a song.'
      })
    }
  }
}
