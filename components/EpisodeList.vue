<template>
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
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import { IEpisode } from '../assets/interface/store';

  export default Vue.extend({
    name: 'EpisodeList',
    props: {
      episode: {
        required: true,
        type: Array as PropType<IEpisode[]>,
      },
    },
  });
</script>
