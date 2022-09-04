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
        <button
          v-if="isPlaying === false"
          class="tw-w-8 tw-h-8 tw-text-center tw-block before-font-material before:tw-content-['\e1c4'] before:tw-block before:tw-text-green before:tw-text-4xl before:tw-leading-8"
          @click.stop="handlePlay"
        >
          <span class="tw-hidden">Play</span>
        </button>

        <button
          v-else
          class="tw-w-8 tw-h-8 tw-text-center tw-block before-font-material before:tw-content-['\e1a2'] before:tw-block before:tw-text-green before:tw-text-4xl before:tw-leading-8"
          @click.stop="handlePause"
        >
          <span class="tw-hidden">Pause</span>
        </button>
      </div>
    </div>
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
