<template>
  <div>
    <audio ref="audioRef" controls :src="enclosure" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Player',
    data() {
      return {};
    },
    computed: {
      enclosure() {
        const index: number = this.$store.state.currentIndex;
        return this.$store.state.episode[index]?.enclosure;
      },
    },
  });
</script>
