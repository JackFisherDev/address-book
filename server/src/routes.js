const AuthenticationController = require('./controllers/AuthenticationController')
const ContactsController = require('./controllers/ContactsController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/api/book',
    ContactsController.getAllContacts)
  app.get('/api/book/:id',
    ContactsController.getContact)
  app.post('/api/book',
    ContactsController.createContact)
  app.delete('/api/book/:id',
    ContactsController.deleteContact)
  app.put('/api/book/:id',
    ContactsController.updateContact)
}
