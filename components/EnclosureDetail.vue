<template>
  <div>
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
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import { IDetail } from '../assets/interface/store';

  export default Vue.extend({
    name: 'EnclosureDetail',
    props: {
      detail: {
        required: true,
        type: Object as PropType<IDetail>,
      },
    },
  });
</script>
