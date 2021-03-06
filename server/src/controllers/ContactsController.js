const { Contact, Group } = require('../models')
// TODO: find a solution to resolve url's for avatars
const CLIENT_URL = 'http://localhost:8080'
const SERVER_URL = 'http://localhost:8081/'

async function addNewGroup (groupName, userID) {
  if (groupName) {
    const groupList = await Group.find({
      where: {
        name: groupName,
        userID
      }
    })

    if (!groupList) {
      await Group.create({
        name: groupName,
        userID
      })
    }
  }
}

module.exports = {
  async getContacts (req, res) {
    try {
      let contacts = null
      const { userID, search } = req.query

      if (search) {
        contacts = await Contact.findAll({
          where: {
            userID,
            $or: [
              'name',
              'groupName'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        contacts = await Contact.findAll({
          where: {
            userID
          }
        })
      }

      res.send(contacts)
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to fetch contacts.'
      })
    }
  },

  async getContact (req, res) {
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
    console.log('avatar file', req.body, req.file)
    try {
      const { name, email, phoneNumber, groupName, userID } = req.body
      const avatar = req.file
        ? SERVER_URL + req.file.path
        : CLIENT_URL + req.body.avatar

      addNewGroup(groupName, userID)

      const contact = await Contact.create({
        name,
        avatar,
        email,
        phoneNumber,
        groupName,
        userID
      })

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
      const { group } = req.body

      addNewGroup(group)

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
