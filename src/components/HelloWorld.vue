<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="color" v-model="colorValue" value="#e66465" />
    <input type="text" v-model="colorName" placeholder="Add name..." />
    <button @click="addColor">Add</button>
    <p v-if="!colors.length">Loading colors...</p>
    <ul v-else>
      <li v-for="(color, i) in colors" :key="i">
        {{ color.name }} - {{ color.hex }}
        <span class="color" :style="{background: `#${color.hex}`}" />
        <span class="delete" @click="deleteColor(color.id)">X</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ColorsService from '@/services/ColorsService'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      colors: [],
      colorName: null,
      colorValue: null
    }
  },
  async mounted () {
    this.colors = (await ColorsService.index()).data
  },
  methods: {
    async deleteColor (colorId) {
      await ColorsService.delete(colorId)
    },
    async addColor () {
      await ColorsService.post({
        name: this.colorName,
        hex: this.colorValue.substring(1)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.color {
  width: 40px;
  height: 15px;
  border: 1px solid black;
  display: inline-block;
}
</style>
