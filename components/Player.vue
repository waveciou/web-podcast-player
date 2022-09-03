<template>
  <div>
    <audio
      ref="audioRef"
      controls
      :src="enclosure"
      @canplay="handleIsCanPlay"
    />
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
    methods: {
      handlePlay() {
        const audioRef: HTMLAudioElement = this.$refs
          .audioRef as HTMLAudioElement;
        audioRef?.play();
      },
      handleIsCanPlay(event: Event) {
        if (event) {
          this.handlePlay();
        }
      },
    },
  });
</script>
