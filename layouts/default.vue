<template>
  <transition name="fade" mode="out-in">
    <Nuxt />
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';

  const X2JS = require('x2js');

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

          this.$store.commit('SET_CHANNEL_LIST', fetchData.rss.channel.item);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      })();
    },
  });
</script>
