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
        <v-card>
          <GroupsListSearch />

          <v-list
            class="pt-0"
            dense
          >
            <v-divider class="mb-3"></v-divider>

            <v-list-tile v-if="!groups.length">
              <p class="d-block subheading">You don't have any group.</p>
            </v-list-tile>

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
                      class="a-sway"
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
                      class="a-spin"
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
                      class="a-jump-up"
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
                      class="a-jump-up"
                    >
                      <v-icon :color="'grey'">delete</v-icon>
                    </v-btn>
                    <span>Delete</span>
                  </v-tooltip>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-layout
            row
            justify-center
          >
            <v-flex
              xs12
              text-xs-center
              class="pt-0 pb-3"
            >
              <v-divider class="mb-3"></v-divider>
              <v-btn
                dark
                class="info"
                round
                @click="createGroupDialog = true"
              >
                Add group
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-dialog
        v-model="createGroupDialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">New Group</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-form
                    ref="form"
                    v-model="newGroupForm"
                    lazy-validation
                  >
                    <v-layout
                      row
                      wrap
                      stretch
                    >
                      <v-flex
                        xs12
                        sm8
                        align-content-center
                      >
                        <v-text-field
                          v-model="newGroup.name"
                          :rules="[!!newGroup.name || 'This field is required.']"
                          label="Group name"
                          prepend-icon="group"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class="pl-3 pr-3 pb-3">
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              flat
              @click="createGroupDialog = false"
            >
              Close
            </v-btn>
            <v-btn
              class="info"
              @click="createGroup"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import GroupsService from '@/services/GroupsService'
import GroupsListSearch from './GroupsListSearch'

export default {
  components: {
    GroupsListSearch
  },

  data () {
    return {
      groups: [],
      userID: this.$store.state.user.id,
      newGroupName: '',
      isEditable: null,
      createGroupDialog: false,
      newGroup: {
        name: '',
        userID: this.$store.state.user.id
      },
      newGroupForm: true
    }
  },

  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (val) {
        this.groups = (await GroupsService.getGroups(this.userID, val)).data
      }
    }
  },

  mounted () {
    this.getAllGroups(this.userID)
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

    async createGroup () {
      if (!this.$refs.form.validate()) return

      try {
        await GroupsService.createGroup(this.newGroup)

        this.createGroupDialog = false
        this.$refs.form.reset()
        this.getAllGroups(this.userID)
      } catch (err) {
        console.log(err)
      }
    },

    async updateGroupName (group) {
      let updatedGroup = Object.assign({}, group)

      updatedGroup.oldGroupName = updatedGroup.name
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
  }
}
</script>

<style scoped>
  p.subheading { margin: 0 auto; }
</style>
