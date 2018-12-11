import Api from '@/services/Api'

export default {
  getGroups (userID) {
    return Api().get('api/groups', {
      params: { userID }
    })
  }
}
