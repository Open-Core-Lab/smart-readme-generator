import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  content: string;
  past: string[];
  future: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EditorState = {
  content: '',
  past: [],
  future: [],
  isLoading: false,
  error: null,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setContent(state, action: PayloadAction<string>) {
      state.past.push(state.content);
      if (state.past.length > 50) {
        state.past.shift();
      }
      state.future = [];
      state.content = action.payload;
    },
    undo(state) {
      if (state.past.length === 0) return;
      state.future.unshift(state.content);
      state.content = state.past.pop()!;
    },
    redo(state) {
      if (state.future.length === 0) return;
      state.past.push(state.content);
      state.content = state.future.shift()!;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetEditor(state) {
      state.content = '';
      state.past = [];
      state.future = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { setContent, undo, redo, setLoading, setError, resetEditor } =
  editorSlice.actions;
export default editorSlice.reducer;
