<template>
  <v-text-field
    v-model="search"
    label="Search contact"
    single-line
  ></v-text-field>
</template>

<script>
// TODO: import appropriate lodash's method
import _ from 'lodash'

export default {
  data() {
    return {
      search: ''
    }
  },

  watch: {
    search: _.debounce(async function (val) {
      const route = { name: 'ContactsList' }

      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }

      this.$router.push(route)
    }, 500),

    '$route.query.search': {
      immediate: true,
      handler(val) {
        this.search = val
      }
    }
  }
}
</script>

<style scoped></style>
