import Api from '@/services/Api'

export default {
  getContacts (userID, searchVal) {
    return Api().get('api/book', {
      params: {
        userID,
        search: searchVal
      }
    })
  },

  getContact (contactID) {
    return Api().get(`api/book/${contactID}`)
  },

  createContact (contact) {
    return Api().post('api/book', contact)
  },

  updateContact (contact) {
    return Api().put(`api/book/${contact.id}`, contact)
  },

  deleteContact (contactID) {
    return Api().delete(`api/book/${contactID}`)
  }
}
