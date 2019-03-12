<template>
  <v-container
    grid-list-md
    text-xs-center
    class="mt-4"
  >
    <v-layout
      row
      justify-center
      class="mt-3"
    >
      <v-flex
        xs12
        sm8
        md6
        text-xs-left
      >
        <v-card class="pb-4">
          <v-card-title class="info white--text">
            <span class="headline">Your groups</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-list
            class="pt-0"
            dense
          >
            <v-divider class="mb-3"></v-divider>

            <v-list-tile
              v-for="group in groups"
              :key="group.id"
            >
              <v-list-tile-content>
                <v-chip
                  v-if="isEditable !== group.id"
                  small
                  :class="{'success': group.name !== 'Family' && group.name !== 'Friend'}"
                  text-color="white"
                >{{ group.name }}</v-chip>
                <v-text-field
                  v-if="isEditable === group.id"
                  v-model="newGroupName"
                  class="pt-0"
                ></v-text-field>
              </v-list-tile-content>

              <v-list-tile-action v-if="group.name !== 'Family' && group.name !== 'Friend'">
                <v-layout>
                  <v-tooltip
                    v-if="isEditable === group.id"
                    class="ml-2 mr-2"
                    top
                  >
                    <v-btn
                      slot="activator"
                      icon
                      @click.stop="updateGroupName(group)"
                    >
                      <v-icon :color="'grey'">save</v-icon>
                    </v-btn>
                    <span>Save</span>
                  </v-tooltip>
                  <v-tooltip
                    v-if="isEditable === group.id"
                    class="ml-2 mr-2"
                    top
                  >
                    <v-btn
                      slot="activator"
                      icon
                      @click.stop="cancelEditGroupName()"
                    >
                      <v-icon :color="'grey'">cancel</v-icon>
                    </v-btn>
                    <span>Cancel</span>
                  </v-tooltip>
                  <v-tooltip
                    v-if="isEditable !== group.id"
                    class="ml-2 mr-2"
                    top
                  >
                    <v-btn
                      slot="activator"
                      icon
                      @click.stop="editGroupName(group.id)"
                    >
                      <v-icon :color="'grey'">edit</v-icon>
                    </v-btn>
                    <span>Edit</span>
                  </v-tooltip>
                  <v-tooltip
                    v-if="isEditable !== group.id"
                    class="ml-2 mr-2"
                    top
                  >
                    <v-btn
                      slot="activator"
                      icon
                      @click.stop="deleteGroup(group.id)"
                    >
                      <v-icon :color="'grey'">delete</v-icon>
                    </v-btn>
                    <span>Delete</span>
                  </v-tooltip>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GroupsService from '@/services/GroupsService'

export default {
  data () {
    return {
      groups: [],
      userID: this.$store.state.user.id,
      newGroupName: '',
      isEditable: null
    }
  },

  methods: {
    editGroupName (groupID) {
      this.groups.forEach((group) => {
        if (groupID === group.id) this.newGroupName = group.name
      })
      this.isEditable = groupID
    },

    cancelEditGroupName () {
      this.isEditable = null
      this.newGroupName = ''
    },

    async updateGroupName (group) {
      let updatedGroup = Object.assign({}, group)
      updatedGroup.name = this.newGroupName

      try {
        await GroupsService.updateGroup(updatedGroup)
          .then((response) => {
            this.isEditable = null
            this.newGroupName = ''

            this.getAllGroups(this.userID)
          })
      } catch (err) {
        console.log(err)
      }
    },

    async getAllGroups (userID) {
      try {
        this.groups = (await GroupsService.getGroups(userID)).data
        console.log(this.groups)
      } catch (err) {
        console.log(err)
      }
    },

    async deleteGroup (groupID) {
      try {
        await GroupsService.deleteGroup(groupID)
        this.getAllGroups(this.userID)
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted () {
    this.getAllGroups(this.userID)
  }
}
</script>

<style scoped>

</style>
