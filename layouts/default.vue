<template>
  <transition name="fade" mode="out-in">
    <Nuxt />
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { IDetail, IEpisode } from '../store';

  const X2JS = require('x2js');

  interface IOriginalData {
    title: string;
    description: string;
    pubDate: string;
    enclosure: { _url: string };
    image: { _href: string };
  }

  export default Vue.extend({
    mounted() {
      (async () => {
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
            image: {
              url: image[0].url,
              title: image[0].title,
            },
          };

          const episode: IEpisode[] = item.map(
            (episodeItem: IOriginalData, index: number) => {
              const { title, description, pubDate, enclosure, image } =
                episodeItem;
              const id = index;

              return {
                id,
                title,
                description,
                enclosure: enclosure._url,
                pubDate,
                imageUrl: image._href,
              };
            }
          );

          this.$store.commit('SET_DETAIL_DATA', detail);
          this.$store.commit('SET_EPISODE_DATA', episode);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      })();
    },
  });
</script>
