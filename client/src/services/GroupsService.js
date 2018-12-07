import Api from '@/services/Api'

export default {
  getGroups () {
    return Api().get('api/groups')
  }
}
