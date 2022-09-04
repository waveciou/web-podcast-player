<template>
  <main class="tw-w-full tw-h-full tw-overflow-x-hidden tw-overflow-y-auto">
    <div class="tw-px-3 tw-pb-20">
      <header class="tw-flex tw-pt-3">
        <nuxt-link
          to="/"
          class="tw-w-6 tw-h-6 tw-text-center tw-block before-font-material before:tw-content-['\e2ea'] before:tw-block before:tw-m-auto before:tw-text-black"
        >
          <span class="tw-hidden">back</span>
        </nuxt-link>
      </header>
      <div class="tw-px-4 tw-my-5">
        <figure
          class="tw-w-full tw-h-0 tw-pb-100p tw-relative tw-overflow-hidden tw-object-cover tw-rounded-md"
        >
          <img
            class="tw-w-full tw-h-full tw-block tw-absolute tw-top-0 tw-left-0 tw-pointer-events-none"
            :src="imgUrl"
            :alt="title"
          />
        </figure>
      </div>
      <div class="tw-my-6">
        <h1 class="tw-text-2xl tw-font-bold tw-mb-2">{{ title }}</h1>
        <div>
          <ButtonPlay
            v-if="currentIndex !== index"
            title="Build Play"
            color="black"
            @set-click="handleBuildPlay"
          />

          <ButtonPlay
            v-else-if="isPlaying === false"
            title="Play"
            color="black"
            @set-click="handlePlay"
          />

          <ButtonPause
            v-else-if="isPlaying === true"
            title="Pause"
            color="black"
            @set-click="handlePause"
          />
        </div>
      </div>
      <div class="tw-mb-5">
        <h2 class="tw-text-xl tw-font-bold tw-mb-4">Description</h2>
        <p class="tw-text-sm tw-rounded-md">{{ description }}</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ButtonPlay from '../../components/ButtonPlay.vue';
  import ButtonPause from '../../components/ButtonPause.vue';

  export default Vue.extend({
    name: 'EpisodePage',
    components: {
      ButtonPlay,
      ButtonPause,
    },
    data() {
      return {
        index: -1,
      };
    },
    computed: {
      imgUrl() {
        return this.$store.state.episode[this.index]?.imgUrl || '';
      },
      title() {
        return this.$store.state.episode[this.index]?.title || '';
      },
      description() {
        return this.$store.state.episode[this.index]?.description || '';
      },
      episode() {
        return this.$store.state.episode;
      },
      isPlaying() {
        return this.$store.state.isPlaying;
      },
      currentIndex() {
        return this.$store.state.currentIndex;
      },
    },
    created() {
      const id: string = this.$route.params.id;

      for (let i = 0; i < this.episode.length; i++) {
        if (this.episode[i].id === id) {
          this.index = i;
          return;
        }
      }

      if (!this.episode[this.index]) {
        this.$router.push('/');
      }
    },
    methods: {
      handleBuildPlay() {
        this.$nuxt.$emit('set-build-play', this.index);
      },
      handlePlay() {
        this.$nuxt.$emit('set-play');
      },
      handlePause() {
        this.$nuxt.$emit('set-pause');
      },
    },
  });
</script>
