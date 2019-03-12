import Api from '@/services/Api'

export default {
  getGroups (userID) {
    return Api().get('api/groups', {
      params: { userID }
    })
  },

  updateGroup (group) {
    return Api().put(`/api/group/${group.id}`, group)
  },

  deleteGroup (groupID) {
    return Api().delete(`/api/group/${groupID}`)
  }
}
