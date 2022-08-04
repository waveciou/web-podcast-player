<template>
  <main class="tw-px-3">
    <header class="tw-flex">
      <nuxt-link
        to="/"
        class="tw-w-6 tw-h-6 tw-text-center tw-block before-font-material before:tw-content-['\e2ea'] before:tw-block before:tw-m-auto before:tw-text-black"
      >
        back
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
      <h1 class="tw-text-2xl tw-font-bold">{{ title }}</h1>
      <button @click.stop="handlePlay">Play</button>
    </div>
    <div class="tw-mb-5">
      <h2 class="tw-text-xl tw-font-bold tw-mb-4">Episode Description</h2>
      <p class="tw-text-sm tw-rounded-md">{{ description }}</p>
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'EpisodePage',
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
      handlePlay() {
        this.$store.commit('SET_CURRENT_INDEX', this.index);
      },
    },
  });
</script>
