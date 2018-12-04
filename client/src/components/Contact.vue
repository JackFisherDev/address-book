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
        <v-card class="pt-4 pb-4">
          <v-layout
            row
            wrap
            align-center
          >
            <v-flex
              xs12
              sm4
              text-xs-center
              class="pl-4 pr-4"
            >
              <v-avatar
                :size="120"
                color="grey lighten-4"
              >
                <img
                  :src="contact.avatar"
                  :alt="contact.name"
                >
              </v-avatar>
            </v-flex>
            <v-flex
              xs12
              sm8
              class="pl-4 pr-4"
            >
              <h6 class="title">{{ contact.name }}</h6>
              <v-chip
                small
                color="success"
                text-color="white"
              >{{ contact.group }}</v-chip>
            </v-flex>
          </v-layout>
          <v-layout
            row
            class="mt-3"
          >
            <v-flex
              xs12
              class="pl-4 pr-4"
            >
              <h6 class="title">Contact info</h6>
              <div>
                <v-text-field
                  v-model="contact.email"
                  label="Email"
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  v-model="contact.phoneNumber"
                  label="Phone Number"
                ></v-text-field>
              </div>
              <div>
                <v-btn
                  flat
                  route
                  to="/contacts"
                >
                  Cancel
                </v-btn>
                <v-btn
                  class="info"
                  @click="updateContact(contact)"
                >
                  Save
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContactsService from '@/services/ContactsService'

export default {
  data () {
    return {
      contact: {}
    }
  },

  async mounted () {
    const contactId = this.$store.state.route.params.id
    
    this.setContact(contactId)
  },

  methods: {
    async updateContact (contact) {
      const c = await ContactsService.updateContact(contact)

      this.setContact(contact.id)
    },

    async setContact (contactId) {
      this.contact = (await ContactsService.getContact(contactId)).data
    }
  }
}
</script>

<style scoped>

</style>
