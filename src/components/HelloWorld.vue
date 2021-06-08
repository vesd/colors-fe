<template>
  <div class="hello">

    <div class="controls">
      <h1 v-if="!$store.state.isUserLoggedIn">{{ msg }}</h1>
      <div v-else>
        <input type="color" v-model="colorValue" />
        <input type="text" v-model="colorValue" placeholder="Add color code..." />
        <input type="text" v-model="colorName" placeholder="Add name..." />
        <button @click="addColor">Add</button>
      </div>
    </div>

    <div class="colors">
      <div
        v-if="!colors.length"
        class="spinner"
      >
        Loading colors...
      </div>
      <div
        v-else
        class="parent"
      >
        <div
          v-for="(color, i) in colors" :key="i"
          class="child"
          :style="{background: `#${color.hex}`}"
          @mouseover="setHover(color)"
          @mouseleave="unsetHover(color)"
        >
        <div
          class="content"
          :class="{ active: color.isHovered }"
        >
          <h3>{{ color.name }}</h3>
          <h4>{{ `#${color.hex}` }}</h4>
          <span
            v-if="$store.state.isUserLoggedIn"
            class="delete"
            @click="deleteColor(color.id)"
          >
            x
          </span>
        </div>
        </div>
      </div>
    </div>
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
      colorValue: '#e66465'
    }
  },
  async mounted () {
    await this.getColors()
  },
  methods: {
    async getColors () {
      const colors = (await ColorsService.index()).data

      this.colors = colors.map(color => {
        color.isHovered = false

        return color
      })
    },
    async deleteColor (colorId) {
      await ColorsService.delete(colorId)
      await this.getColors()
    },
    async addColor () {
      await ColorsService.post({
        name: this.colorName,
        hex: this.colorValue.substring(1)
      })
      await this.getColors()
    },
    setHover (color) {
      color.isHovered = true
    },
    unsetHover (color) {
      color.isHovered = false
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
h1 {
  margin: 0;
}
p {
  margin: 0;
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
.parent {
  display: flex;
  justify-content: center;
}
.child {
  width: 200px;
  height: 300px;
}
.content {
  opacity: 0;
  transition: 0.2s ease-out;

  &.active {
    opacity: 1;
  }
}
.delete {
  font-size: 28px;
  font-weight: bold;
  height: 30px;
  width: 30px;
  display: inline-block;
  line-height: 27px;
  transition: 0.2s ease-out;
  border-radius: 5px;

  &:hover {
    background: rgba(0,0,0,0.05);
    cursor: pointer;
  }
}

.controls {
  background-color: navajowhite;
  height: 100px;
}
.colors {
  background-color: salmon;
  height: 400px;
}
</style>
