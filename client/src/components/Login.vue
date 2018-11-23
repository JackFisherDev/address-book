<template>
  <v-container class="mt-5 pt-5">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-form ref="form">
          <v-text-field
            v-model="email"
            name="email"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :type="'password'"
            name="password"
            label="Password"
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
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
