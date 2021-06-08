<template>
  <div class="controls">
    <h1 v-if="!$store.state.isUserLoggedIn">Log in to add and remove colors</h1>
    <div v-else>
      <input type="color" v-model="colorValue" />
      <input type="text" v-model="colorValue" placeholder="Add color code..." />
      <input type="text" v-model="colorName" placeholder="Add name..." />
      <button @click="addColor">Add</button>
    </div>
  </div>
</template>

<script>
import ColorsService from '@/services/ColorsService'

export default {
  name: 'Controls',
  data () {
    return {
      colorName: null,
      colorValue: '#e66465'
    }
  },
  methods: {
    async addColor () {
      await ColorsService.post({
        name: this.colorName,
        hex: this.colorValue.substring(1)
      })
      this.$emit('updateColors')
    }
  }
}
</script>

<style scoped lang="scss">
.controls {
  background-color: navajowhite;
  height: 100px;

  h1 {
    margin: 0;
  }
}
</style>
