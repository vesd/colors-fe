<template>
  <div class="header">
    <span>{{ name }}</span>
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
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  name: 'Header',
  data () {
    return {
      username: 'admin',
      password: 'admin'
    }
  },
  computed: {
    name () {
      return this.$store.state.isUserLoggedIn
        ? this.$store.state.user.username
        : 'guest'
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
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  box-shadow: 0 1px 4px #cbcccd;

  p {
    margin: 0;
  }

  button {
    height: 27px;
    padding: 0px 11px;
  }
}
</style>
