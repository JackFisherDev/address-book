const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './storage/images/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '_$_' + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({ 
  storage,
  limit: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
})

const AuthenticationController = require('./controllers/AuthenticationController')
const ContactsController = require('./controllers/ContactsController')
const GroupsController = require('./controllers/GroupsController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/api/book',
    ContactsController.getContacts)
  app.get('/api/book/:id',
    ContactsController.getContact)
  app.post('/api/book',
    upload.single('avatar'),
    ContactsController.createContact)
  app.put('/api/book/:id',
    ContactsController.updateContact)
  app.delete('/api/book/:id',
    ContactsController.deleteContact)

  app.get('/api/groups',
    GroupsController.getGroups)
  app.post('/api/group',
    GroupsController.createGroup)
  app.put('/api/group/:id',
    GroupsController.updateGroup)
  app.delete('/api/group/:id',
    GroupsController.deleteGroup)
}
