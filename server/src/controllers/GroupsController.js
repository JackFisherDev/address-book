const { Group } = require('../models')

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

  async updateGroup (req, res) {
    try {
      await Group.update(req.body, {
        where: {
          id: req.params.id
        }
      })

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
