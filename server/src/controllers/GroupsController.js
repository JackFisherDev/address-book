const { Group } = require('../models')
const { Contact } = require('../models')

module.exports = {
  async getGroups (req, res) {
    try {
      const { userID } = req.query
      const groups = await Group.findAll({
        where: {
          userID
        }
      })

      res.send(groups)
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to fetch groups.'
      })
    }
  },

  async createGroup (req, res) {
    try {
      await Group.count({
        where: {
          name: req.body.name,
          userID: req.body.userID
        }
      })
        .then(count => {
          if (!count) {
            const group = Group.create(req.body)

            res.send(group)
          } else {
            res.status(400).send({
              error: 'This group already exists.'
            })
          }
        })
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to create a contact.'
      })
    }
  },

  async updateGroup (req, res) {
    try {
      await Group.update(req.body, {
        where: {
          id: req.params.id
        }
      })

      await Contact.update(
        { groupName: req.body.name },
        {
          where: {
            userID: req.body.userID,
            groupName: req.body.oldGroupName
          }
        }
      )

      res.send('Group has been updated')
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to update group.'
      })
    }
  },

  async deleteGroup (req, res) {
    try {
      await Group.destroy({
        where: {
          id: req.params.id
        }
      })

      res.send('Group has been deleted')
    } catch (e) {
      res.status(500).send({
        error: 'Ooops! Sorry, something went wrong when trying to delete the group.'
      })
    }
  }
}
