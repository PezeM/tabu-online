import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorageValue, saveLocalStorage } from '@/utils/localStorage';
import { RootState } from '@/store';

interface InitialState {
  isSoundMuted: boolean;
}

const initialState: InitialState = {
  isSoundMuted: false,
};

const initialStateInLocalStorage = getLocalStorageValue('settings', initialState);

export const settingsSplice = createSlice({
  name: 'settings',
  initialState: { ...initialState, ...initialStateInLocalStorage } as InitialState,
  reducers: {
    toggleIsSoundMuted: state => {
      state.isSoundMuted = !state.isSoundMuted;
      saveLocalStorage('settings', state);
    },
  },
});

export const { toggleIsSoundMuted } = settingsSplice.actions;

export const selectIsSoundMuted = (state: RootState) => state.settings.isSoundMuted;

export default settingsSplice.reducer;
