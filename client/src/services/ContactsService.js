import Api from '@/services/Api'

export default {
  getAllContacts () {
    return Api().get('api/book')
  },

  createContact (contact) {
    return Api().post('api/book', contact)
  }
}
