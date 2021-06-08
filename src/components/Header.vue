<template>
  <div class="header">
    <button
      v-if="!$store.state.isUserLoggedIn"
      @click="login"
    >
      Log in
    </button>
    <button
      v-else
      @click="logout"
    >
      Log out
    </button>
    <p v-if="$store.state.isUserLoggedIn">{{ $store.state.user.username }}</p>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  name: 'Header',
  props: {
    msg: String
  },
  data () {
    return {
      username: 'admin',
      password: 'admin'
    }
  },
  methods: {
    async login () {
      const response = await AuthService.login({
        username: this.username,
        password: this.password
      })
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setUser', response.data.user)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  background-color: pink;
  height: 50px;

  p {
    margin: 0;
  }
}
</style>
