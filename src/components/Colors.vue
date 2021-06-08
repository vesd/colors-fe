<template>
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
</template>

<script>
import ColorsService from '@/services/ColorsService'

export default {
  name: 'Colors',
  props: {
    msg: String,
    colors: Array
  },
  methods: {
    async deleteColor (colorId) {
      await ColorsService.delete(colorId)
      this.$emit('updateColors')
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
.colors {
  height: 400px;
  flex: 1;

  .parent {
    display: flex;
    justify-content: center;
    height: 100%;
  }

  .child {
    flex: 1;
  }

  .content {
    opacity: 0;
    transition: 0.2s ease-out;
    padding-top: 50px;

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
}
</style>
