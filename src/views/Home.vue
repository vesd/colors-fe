<template>
  <div class="home">
    <Header />
    <Controls @updateColors="getColors" />
    <Colors :colors="colors" @updateColors="getColors" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Controls from '@/components/Controls.vue'
import Colors from '@/components/Colors.vue'
import ColorsService from '@/services/ColorsService'

export default {
  name: 'Home',
  components: {
    Header,
    Controls,
    Colors
  },
  data () {
    return {
      colors: []
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
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
