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
                <v-list-tile-title v-html="contact.name"></v-list-tile-title>
                <v-chip
                  v-if="contact.group"
                  small
                  color="success"
                  text-color="white"
                >{{ contact.group }}</v-chip>
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
                      v-model="contact.name"
                      :rules="nameRules"
                      label="Contact name"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="contact.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="contact.avatar"
                      label="Avatar"
                    ></v-text-field>
                    <v-text-field
                      v-model="contact.phoneNumber"
                      :rules="phoneNumberRules"
                      return-masked-value
                      mask="+################"
                      label="Phone number"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="contact.group"
                      label="Group"
                    ></v-text-field>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              flat
              @click="createContactDialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              flat
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
      contact: {
        name: null,
        email: null,
        avatar: null,
        phoneNumber: null,
        group: null
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
        await ContactsService.createContact(this.contact)
        this.createContactDialog = false
        this.getAllContacts()
      } catch (err) {
        console.log(err)
      }
    },

    async getAllContacts () {
      this.contacts = (await ContactsService.getAllContacts()).data
    },

    showContact (contactId) {
      this.$router.push({ path: `/contact/${contactId}` })
    },

    async deleteContact (contactId) {
      try {
        await ContactsService.deleteContact(contactId)
        this.getAllContacts()
      } catch (err) {
        console.log(err)
      }
    },

    async getGroups () {
      try {
        this.groups = (await GroupsService.getGroups()).data
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted () {
    this.getGroups()
  },

  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (val) {
        this.contacts = (await ContactsService.getAllContacts(val)).data
      }
    }
  }
}
</script>

<style scoped>

</style>
