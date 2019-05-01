<template>
  <v-toolbar
    flat
    class="transparent elevation-1"
  >
    <v-text-field
      v-model="search"
      label="Search contact"
      single-line
    ></v-text-field>
  </v-toolbar>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      search: ''
    }
  },

  watch: {
    search: _.debounce(async function (val) {
      const route = { name: 'Groups' }

      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }

      this.$router.push(route)
    }, 500),

    '$route.query.search': {
      immediate: true,
      handler (val) {
        this.search = val
      }
    }
  }
}
</script>

<style scoped>

</style>
