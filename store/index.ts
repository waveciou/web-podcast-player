import { MutationTree } from 'vuex';

export interface IDetail {
  author: string;
  title: string;
  description: string;
  imgUrl: string;
}

export interface IEpisode {
  id: string;
  title: string;
  description: string;
  enclosure: string;
  pubDate: string;
  imgUrl: string;
}

export const state = (): {
  detail: IDetail;
  episode: IEpisode[];
} => ({
  detail: {
    author: '',
    title: '',
    description: '',
    imgUrl: '',
  },
  episode: [],
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  SET_DETAIL_DATA(state: RootState, payload: IDetail) {
    const assignState = state;
    assignState.detail = JSON.parse(JSON.stringify(payload));
  },
  SET_EPISODE_DATA(state: RootState, payload: IEpisode[]) {
    const assignState = state;
    assignState.episode = [...payload];
  },
};
