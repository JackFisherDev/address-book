const { Contact } = require('../models')

module.exports = {
  async getAllContacts (req, res) {
    try {
      const contacts = await Contact.findAll({
        where: {}
      })
      res.send(contacts)
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to fetch contacts.'
      })
    }
  },

  async getContact (req, res) {
    console.log(`bratann ${req.params.id}`)
    try {
      const contact = await Contact.find({
        where: {
          id: req.params.id
        }
      })
      res.send(contact)
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to fetch contact.'
      })
    }
  },

  async createContact (req, res) {
    try {
      const contact = await Contact.create(req.body)
      res.send(contact)
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to create a contact.'
      })
    }
  },

  async deleteContact (req, res) {
    try {
      await Contact.destroy({
        where: {
          id: req.params.id
        }
      })
      res.send('Contact has been deleted')
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to delete the contact.'
      })
    }
  },

  async updateContact (req, res) {
    try {
      await Contact.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.send('Contact has been updated')
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to update the contact.'
      })
    }
  }
}
