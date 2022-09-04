<template>
  <main
    ref="pageRef"
    class="tw-w-full tw-h-full tw-overflow-x-hidden tw-overflow-y-auto"
    @scroll="handlePageScroll"
  >
    <div class="tw-px-3 tw-pb-20">
      <EnclosureDetail :detail="detail" />
      <EpisodeList :episode="episode" />
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import EnclosureDetail from '../components/EnclosureDetail.vue';
  import EpisodeList from '../components/EpisodeList.vue';

  export default Vue.extend({
    name: 'HomePage',
    components: {
      EnclosureDetail,
      EpisodeList,
    },
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
