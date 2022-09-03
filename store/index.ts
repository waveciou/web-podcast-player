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
  isLoading: boolean;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  currentIndex: number;
} => ({
  detail: {
    author: '',
    title: '',
    description: '',
    imgUrl: '',
  },
  episode: [],
  isLoading: false,
  isPlaying: false,
  duration: 0,
  currentTime: 0,
  currentIndex: -1,
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
  SET_IS_LOADING(state: RootState, payload: boolean) {
    const assignState = state;
    assignState.isLoading = payload;
  },
  SET_IS_PLAYING(state: RootState, payload: boolean) {
    const assignState = state;
    assignState.isPlaying = payload;
  },
  SET_DURATION(state: RootState, payload: number) {
    const assignState = state;
    assignState.duration = payload;
  },
  SET_CURRENT_TIME(state: RootState, payload: number) {
    const assignState = state;
    assignState.currentTime = payload;
  },
  SET_CURRENT_INDEX(state: RootState, payload: number) {
    const assignState = state;
    assignState.currentIndex = payload;
  },
};
