<template>
  <v-container class="mt-5 pt-5">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title
            primary-title
            class="pb-0"
          >
            <div>
              <h3 class="headline mb-0">Login</h3>
            </div>
          </v-card-title>

          <v-form ref="form" class="pa-4">
            <v-text-field
              v-model="email"
              name="email"
              label="E-mail"
              prepend-icon="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :type="'password'"
              name="password"
              label="Password"
              prepend-icon="lock"
              required
            ></v-text-field>
            <v-alert
              :value="error"
              color="error"
              icon="warning"
              outline
            >
              {{ error }}
            </v-alert>
            <v-btn
              @click="login"
              color="info"
            >
              login
            </v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      this.error = null

      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.email = ''
        this.password = ''

        this.$router.push({
          name: 'Contacts'
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
