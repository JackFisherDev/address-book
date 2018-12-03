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
  app.post('/api/book',
    ContactsController.createContact)
}
