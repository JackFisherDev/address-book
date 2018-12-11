<template>
  <v-container
    grid-list-md
    text-xs-center
    class="mt-5 pt-4"
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
          <contact-search />

          <v-list
            class="pt-0"
            dense
          >
            <v-divider class="mb-3"></v-divider>

            <v-list-tile
              v-for="contact in contacts"
              :key="contact.id"
              avatar
              @click="showContact(contact.id)"
            >
              <v-list-tile-avatar>
                <img :src="contact.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title
                  v-html="contact.name"
                  class="font-weight-bold"
                ></v-list-tile-title>
                <v-chip
                  v-if="contact.groupName"
                  small
                  color="success"
                  text-color="white"
                >{{ contact.groupName }}</v-chip>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    @click.stop="deleteContact(contact.id)"
                  >
                    <v-icon :color="'grey'">delete</v-icon>
                  </v-btn>
                  <span>Delete</span>
                </v-tooltip>
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
              class="pa-4"
            >
              <v-btn
                dark
                class="info"
                round
                @click="createContactDialog = true"
              >
                Add contact
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-dialog
        v-model="createContactDialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">New Contact</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-form
                    ref="form"
                    v-model="newContactForm"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="newContact.name"
                      :rules="nameRules"
                      label="Contact name"
                      prepend-icon="person"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="newContact.email"
                      :rules="emailRules"
                      label="E-mail"
                      prepend-icon="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="newContact.avatar"
                      label="Avatar"
                      prepend-icon="photo"
                    ></v-text-field>
                    <v-text-field
                      v-model="newContact.phoneNumber"
                      :rules="phoneNumberRules"
                      return-masked-value
                      mask="+################"
                      label="Phone number"
                      prepend-icon="phone"
                      required
                    ></v-text-field>
                    <v-combobox
                      v-model="newContact.groupName"
                      :items="groups"
                      label="Group"
                      small-chips
                      search-input
                      persistent-hint
                      prepend-icon="group"
                    >
                      <template
                        slot="selection"
                        slot-scope="data"
                      >
                        <v-chip
                          class="success"
                          text-color="white"
                          small
                        >
                          {{ data.item }}
                        </v-chip>
                      </template>
                    </v-combobox>
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
              @click="createContactDialog = false"
            >
              Close
            </v-btn>
            <v-btn
              class="info"
              @click="createContact"
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
import ContactsService from '@/services/ContactsService'
import GroupsService from '@/services/GroupsService'
import ContactSearch from './ContactSearch'

export default {
  components: {
    ContactSearch
  },
  data () {
    return {
      contacts: null,
      defaultContact: {
        name: null,
        email: null,
        avatar: null,
        phoneNumber: null,
        groupName: null,
        userID: this.$store.state.user.id
      },
      newContact: {
        name: null,
        email: null,
        avatar: null,
        phoneNumber: null,
        groupName: null,
        userID: this.$store.state.user.id
      },
      createContactDialog: false,
      groups: [],
      newContactForm: true,
      // Form validation rules
      nameRules: [
        name => !!name || 'This field is required.'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid.'
      ],
      phoneNumberRules: [
        pN => !!pN || 'This field is required.'
      ]
    }
  },

  methods: {
    async createContact () {
      if (!this.$refs.form.validate()) return

      try {
        await ContactsService.createContact(this.newContact)
        this.createContactDialog = false
        this.newContact = Object.assign({}, this.defaultContact)
        this.$refs.form.reset()
        this.getAllContacts(this.defaultContact.userID)
      } catch (err) {
        console.log(err)
      }
    },

    async getAllContacts (userID) {
      this.contacts = (await ContactsService.getAllContacts(userID)).data
      this.getGroups(userID)
    },

    showContact (contactID) {
      this.$router.push({ path: `/contact/${contactID}` })
    },

    async deleteContact (contactID) {
      try {
        await ContactsService.deleteContact(contactID)
        this.getAllContacts(this.defaultContact.userID)
      } catch (err) {
        console.log(err)
      }
    },

    async getGroups (userID) {
      try {
        const groupList = (await GroupsService.getGroups(userID)).data
        this.groups = groupList.map(group => group.name)
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted () {
    this.getGroups(this.defaultContact.userID)
  },

  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (val) {
        this.contacts = (await ContactsService.getAllContacts(this.defaultContact.userID, val)).data
      }
    }
  }
}
</script>

<style scoped>

</style>
