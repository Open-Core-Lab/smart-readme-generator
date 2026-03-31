import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import editorReducer from './editorSlice';
import templateReducer from './templateSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    editor: editorReducer,
    template: templateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
