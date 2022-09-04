<template>
  <div class="tw-w-full tw-bg-black tw-absolute tw-left-0 tw-bottom-0">
    <div class="tw-w-full tw-flex tw-items-center tw-p-2">
      <div class="tw-w-[calc(100%-2rem)] tw-flex tw-items-center">
        <figure
          class="tw-w-12 tw-h-12 tw-relative tw-overflow-hidden tw-object-cover tw-flex-shrink-0 tw-rounded-md"
        >
          <img
            class="tw-w-full tw-h-full tw-block tw-absolute tw-top-0 tw-left-0 tw-pointer-events-none"
            :src="currentEpisode.imgUrl"
            :alt="currentEpisode.title"
          />
        </figure>
        <div class="tw-px-3 tw-flex-1 tw-overflow-hidden">
          <p class="tw-text-white tw-truncate">{{ currentEpisode.title }}</p>
        </div>
      </div>
      <div class="tw-w-8">
        <ButtonPlay
          v-if="isPlaying === false"
          title="Play"
          color="green"
          @set-click="handlePlay"
        />

        <ButtonPause
          v-else
          title="Pause"
          color="green"
          @set-click="handlePause"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ButtonPlay from '../components/ButtonPlay.vue';
  import ButtonPause from '../components/ButtonPause.vue';

  export default Vue.extend({
    name: 'Player',
    components: {
      ButtonPlay,
      ButtonPause,
    },
    computed: {
      currentEpisode() {
        const index: number = this.$store.state.currentIndex;
        return this.$store.state.episode[index];
      },
      isPlaying() {
        return this.$store.state.isPlaying;
      },
    },
    methods: {
      handlePlay() {
        this.$nuxt.$emit('set-play');
      },
      handlePause() {
        this.$nuxt.$emit('set-pause');
      },
    },
  });
</script>
