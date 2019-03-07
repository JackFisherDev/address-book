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
                  small
                  :class="{'success': group.name !== 'Family' && group.name !== 'Friend'}"
                  text-color="white"
                >{{ group.name }}</v-chip>
              </v-list-tile-content>

              <v-list-tile-action v-if="group.name !== 'Family' && group.name !== 'Friend'">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    @click.stop="deleteGroup(group.id)"
                  >
                    <v-icon :color="'grey'">delete</v-icon>
                  </v-btn>
                  <span>Delete</span>
                </v-tooltip>
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
      userID: this.$store.state.user.id
    }
  },

  methods: {
    async getGroups (userID) {
      try {
        this.groups = (await GroupsService.getGroups(userID)).data
        console.log(this.groups)
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted () {
    this.getGroups(this.userID)
  }
}
</script>

<style scoped>

</style>
