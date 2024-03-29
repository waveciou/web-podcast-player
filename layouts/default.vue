<template>
  <div class="tw-w-full tw-h-full tw-overflow-hidden tw-relative">
    <audio
      ref="audioRef"
      :src="enclosure"
      class="tw-absolute tw-invisible tw-z-0"
      @timeupdate="handleTimeUpdate"
      @canplay="handleIsCanPlay"
    />
    <transition name="fade" mode="out-in">
      <Nuxt v-if="isDataInit" />
    </transition>
    <transition name="fade" mode="out-in">
      <Loading v-if="isLoading" />
    </transition>
    <Player v-if="currentIndex !== -1" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { IDetail, IEpisode } from '../assets/interface/store';
  import { IOriginalData } from '../assets/interface/fetchData';
  import Loading from '../components/Loading.vue';
  import Player from '../components/Player.vue';

  const X2JS = require('x2js');

  export default Vue.extend({
    components: {
      Loading,
      Player,
    },
    data() {
      return {
        isDataInit: false,
      };
    },
    computed: {
      isLoading() {
        return this.$store.state.isLoading;
      },
      isLastEpisode() {
        if (
          this.$store.state.currentIndex + 1 >=
          this.$store.state.episode.length
        ) {
          return true;
        }
        return false;
      },
      currentIndex() {
        return this.$store.state.currentIndex;
      },
      enclosure() {
        const index: number = this.$store.state.currentIndex;
        return this.$store.state.episode[index]?.enclosure;
      },
    },
    created() {
      this.$nuxt.$on('set-build-play', (index: number) => {
        this.$store.commit('SET_CURRENT_INDEX', index);
      });

      this.$nuxt.$on('set-play', () => {
        this.handlePlay();
      });

      this.$nuxt.$on('set-pause', () => {
        this.handlePause();
      });
    },
    mounted() {
      this.handleFetchData();
    },
    methods: {
      async handleFetchData() {
        try {
          const { data } = await this.$axios({
            method: 'get',
            url: 'https://feeds.soundon.fm/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml',
            headers: { 'Content-Type': 'text/xml' },
          });

          const x2js = new X2JS();
          const fetchData = x2js.xml2js(data);
          const { author, title, description, image, item } =
            fetchData.rss.channel;

          const detail: IDetail = {
            author: author.__cdata,
            title,
            description,
            imgUrl: image[0].url,
          };

          const episode: IEpisode[] = item.map(
            (episodeItem: IOriginalData, index: number) => {
              const { title, description, pubDate, enclosure, image } =
                episodeItem;

              return {
                id: `${index}`,
                title,
                description,
                enclosure: enclosure._url,
                pubDate,
                imgUrl: image._href,
              };
            }
          );

          this.$store.commit('SET_DETAIL_DATA', detail);
          this.$store.commit('SET_EPISODE_DATA', episode);

          this.isDataInit = true;

          this.$store.commit('SET_IS_LOADING', false);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          this.$router.push('/error');
        }
      },
      handleIsCanPlay(event: Event) {
        if (event) {
          this.handlePlay();
        }
      },
      handlePlay() {
        const audioRef: HTMLAudioElement = this.$refs
          .audioRef as HTMLAudioElement;
        const audioPromise = audioRef?.play();

        if (audioPromise) {
          audioPromise
            .then(() => {
              this.$store.commit('SET_DURATION', audioRef?.duration);
              this.$store.commit('SET_IS_PLAYING', true);
            })
            .catch((_error) => {
              this.$store.commit('SET_IS_PLAYING', false);
            });
        }
      },
      handlePause() {
        const audioRef: HTMLAudioElement = this.$refs
          .audioRef as HTMLAudioElement;
        audioRef?.pause();
        this.$store.commit('SET_IS_PLAYING', false);
      },
      handleTimeUpdate() {
        const audioRef: HTMLAudioElement = this.$refs
          .audioRef as HTMLAudioElement;

        this.$store.commit('SET_CURRENT_TIME', audioRef.currentTime);

        if (audioRef.ended) {
          this.handlePause();
          this.$store.commit('SET_CURRENT_TIME', 0);
          this.$store.commit('SET_DURATION', 0);

          if (this.isLastEpisode === false) {
            const nextIndex: number = this.$store.state.currentIndex + 1;
            this.$store.commit('SET_CURRENT_INDEX', nextIndex);
          }
        }
      },
    },
  });
</script>
