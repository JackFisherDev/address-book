import Api from '@/services/Api'

export default {
  getAllContacts () {
    return Api().get('api/book')
  },

  getContact (contactId) {
    return Api().get(`api/book/${contactId}`)
  },

  createContact (contact) {
    return Api().post('api/book', contact)
  },

  deleteContact (contactId) {
    return Api().delete(`api/book/${contactId}`)
  },

  updateContact (contact) {
    return Api().put(`api/book/${contact.id}`, contact)
  }
}
