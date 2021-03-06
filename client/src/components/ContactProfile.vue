<template>
  <v-container grid-list-md text-xs-center class="mt-4">
    <v-layout row justify-center class="mt-3">
      <v-flex xs12 sm8 md6 text-xs-left>
        <v-card class="pb-4">
          <v-card-title class="info white--text">
            <span class="headline">{{ contact.name }}</span>

            <v-spacer />

            <v-menu bottom left>
              <v-btn slot="activator" icon dark>
                <v-icon>more_vert</v-icon>
              </v-btn>

              <v-list>
                <v-list-tile @click="enabledEditMode = true">
                  <v-list-tile-title>Edit</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="deleteContact(contact.id)">
                  <v-list-tile-title>Delete</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-form ref="contactForm" v-model="contactForm" lazy-validation>
            <v-layout row wrap stretch class="mt-3">
              <v-flex xs12 sm4 text-xs-center class="pl-4 pr-4">
                <v-avatar :size="120" color="grey lighten-4">
                  <img :src="contact.avatar" :alt="contact.name" />
                </v-avatar>
              </v-flex>
              <v-flex xs12 sm8 class="pl-4 pr-4" align-content-center>
                <v-text-field
                  v-model="contact.name"
                  :rules="nameRules"
                  :readonly="!enabledEditMode"
                  prepend-icon="person"
                  :append-icon="enabledEditMode ? 'edit' : ''"
                  label="Contact name"
                />
                <v-layout align-center>
                  <v-flex xs10>
                    <v-combobox
                      v-model="contact.groupName"
                      :items="groups"
                      :readonly="!enabledEditMode"
                      label="Group"
                      small-chips
                      search-input
                      persistent-hint
                      prepend-icon="group"
                      append-icon="arrow_drop_down"
                    >
                      <template slot="selection" slot-scope="data">
                        <v-chip class="success" text-color="white" small>
                          {{ data.item }}
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-flex>
                  <v-flex xs2>
                    <v-tooltip top>
                      <v-btn
                        slot="activator"
                        flat
                        icon
                        color="grey darken-1"
                        class="a-spin"
                        route
                        to="/groups"
                      >
                        <v-icon>settings</v-icon>
                      </v-btn>
                      <span>Manage grops</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout row class="mt-3">
              <v-flex xs12 class="pl-4 pr-4">
                <h6 class="title mt-2 mb-3">
                  Contact info
                </h6>
                <div>
                  <v-text-field
                    v-model="contact.email"
                    :rules="emailRules"
                    :readonly="!enabledEditMode"
                    prepend-icon="email"
                    :append-icon="enabledEditMode ? 'edit' : ''"
                    label="Email"
                  />
                </div>
                <div>
                  <v-text-field
                    v-model="contact.phoneNumber"
                    :rules="phoneNumberRules"
                    :readonly="!enabledEditMode"
                    prepend-icon="phone"
                    :append-icon="enabledEditMode ? 'edit' : ''"
                    label="Phone Number"
                  />
                </div>
                <div v-if="enabledEditMode">
                  <v-btn flat @click="enabledEditMode = false">
                    Cancel
                  </v-btn>
                  <v-btn class="info" @click="updateContact(contact)">
                    Save
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContactsService from '@/services/ContactsService'
import GroupsService from '@/services/GroupsService'

export default {
  data() {
    return {
      contact: {},
      contactForm: true,
      enabledEditMode: false,
      groups: [],
      // Form validation
      nameRules: [(name) => !!name || 'Please, enter contact name.'],
      emailRules: [
        (v) => !!v || 'Please, enter E-mail address.',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid.'
      ],
      phoneNumberRules: [(pN) => !!pN || 'Please, enter phone number.']
    }
  },

  async mounted() {
    const { id } = this.$store.state.route.params

    this.setContact(id)
    this.getGroups(this.$store.state.user.id)
  },

  methods: {
    async updateContact(contact) {
      if (!this.$refs.contactForm.validate()) return

      try {
        await ContactsService.updateContact(contact)

        this.setContact(contact.id)
        this.enabledEditMode = false
      } catch (err) {
        console.log(err)
      }
    },

    async setContact(contactID) {
      this.contact = (await ContactsService.getContact(contactID)).data
    },

    async deleteContact(contactID) {
      try {
        await ContactsService.deleteContact(contactID)

        this.$router.push({ path: '/contacts' })
      } catch (err) {
        console.log(err)
      }
    },

    async getGroups(userID) {
      try {
        const groupList = (await GroupsService.getGroups(userID)).data
        this.groups = groupList.map((group) => group.name)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped></style>
