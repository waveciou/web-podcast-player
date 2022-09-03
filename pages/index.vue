<template>
  <main
    ref="pageRef"
    class="tw-w-full tw-h-full tw-overflow-x-hidden tw-overflow-y-auto"
    @scroll="handlePageScroll"
  >
    <div class="tw-px-3">
      <div class="tw-flex tw-items-center tw-py-5">
        <figure
          class="tw-w-40 tw-h-40 tw-relative tw-overflow-hidden tw-object-cover tw-flex-shrink-0 tw-rounded-md"
        >
          <img
            class="tw-w-full tw-h-full tw-block tw-absolute tw-top-0 tw-left-0 tw-pointer-events-none"
            :src="detail.imgUrl"
            :alt="detail.title"
          />
        </figure>
        <div class="tw-px-4 tw-my-5">
          <h1 class="tw-text-2xl tw-font-bold">{{ detail.title }}</h1>
          <p>{{ detail.author }}</p>
        </div>
      </div>
      <p class="tw-text-sm">{{ detail.description }}</p>
      <ul class="tw-my-5">
        <li v-for="item in episode" :key="item.id" class="tw-my-3">
          <nuxt-link
            class="tw-flex tw-items-center tw-p-2 tw-bg-black tw-rounded-md"
            :to="`/episode/${item.id}`"
            :title="item.title"
          >
            <figure
              class="tw-w-12 tw-h-12 tw-relative tw-overflow-hidden tw-object-cover tw-flex-shrink-0 tw-rounded-md"
            >
              <img
                class="tw-w-full tw-h-full tw-block tw-absolute tw-top-0 tw-left-0 tw-pointer-events-none"
                :src="item.imgUrl"
                :alt="item.title"
              />
            </figure>
            <div class="tw-px-3 tw-flex-1 tw-overflow-hidden">
              <p class="tw-text-white tw-truncate">{{ item.title }}</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'HomePage',
    computed: {
      detail() {
        return this.$store.state.detail;
      },
      episode() {
        return this.$store.state.episode;
      },
      scrollValue() {
        return this.$store.state.homePageScrollValue;
      },
    },
    mounted() {
      this.$nuxt.$nextTick(() => {
        const pageRef: HTMLDivElement = this.$refs.pageRef as HTMLDivElement;
        pageRef.scrollTop = this.scrollValue;
      });
    },
    methods: {
      handlePageScroll() {
        const pageRef: HTMLDivElement = this.$refs.pageRef as HTMLDivElement;
        const scrollValue: number = pageRef.scrollTop;
        this.$store.commit('SET_HOMEPAGE_SCROLL_VALUE', scrollValue);
      },
    },
  });
</script>
