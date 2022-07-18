import { MutationTree } from 'vuex';

export const state = () => ({
  channelList: [],
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  SET_CHANNEL_LIST(state: RootState, payload: any) {
    const assignState = state;
    assignState.channelList = payload;
  },
};
