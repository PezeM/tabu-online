import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageValue, saveLocalStorage } from '@/utils/localStorage';
import { RootState } from '@/store';

interface InitialState {
  isSoundMuted: boolean;
  isLoading: boolean;
}

const initialState: InitialState = {
  isSoundMuted: false,
  isLoading: false,
};

const initialStateInLocalStorage = getLocalStorageValue('settings', initialState);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: { ...initialState, ...initialStateInLocalStorage } as InitialState,
  reducers: {
    toggleIsSoundMuted: state => {
      state.isSoundMuted = !state.isSoundMuted;
      saveLocalStorage('settings', state);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleIsSoundMuted, setIsLoading } = settingsSlice.actions;

export const selectIsSoundMuted = (state: RootState) => state.settings.isSoundMuted;
export const selectIsLoading = (state: RootState) => state.settings.isLoading;

export default settingsSlice.reducer;
