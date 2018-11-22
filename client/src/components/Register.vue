<template>
  <v-container>
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
            @click="register"
            color="info"
          >
            sign in
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
    async register () {
      this.error = null

      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
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
