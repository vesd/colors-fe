<template>
  <div class="controls">
    <h2 v-if="!$store.state.isUserLoggedIn">Log in to add and remove colors</h2>
    <template v-else>
      <input type="color" v-model="colorValue" />
      <input class="color-value" type="text" v-model="colorValue" placeholder="Add color code..." />
      <input class="color-name" type="text" v-model="colorName" placeholder="Add name..." />
      <button @click="addColor">Add</button>
    </template>
  </div>
</template>

<script>
import ColorsService from '@/services/ColorsService'

export default {
  name: 'Controls',
  data () {
    return {
      colorName: null,
      colorValue: '#d1cccc'
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
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 0;
  }

  input {
    margin-right: 4px;
  }

  input[type=text] {
    height: 25px;
    border: 1px solid #777;
    border-radius: 3px;
    padding: 0 6px;
  }

  .color-value {
    width: 60px;
  }

  .color-name {
    width: 100px;
  }

  button {
    height: 27px;
    padding: 0px 11px;
  }
}
</style>
