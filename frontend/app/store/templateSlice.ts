import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Template } from '../types';

interface TemplateState {
  selectedId: string | null;
  templates: Template[];
}

const initialState: TemplateState = {
  selectedId: null,
  templates: [],
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setSelectedTemplate(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
    setTemplates(state, action: PayloadAction<Template[]>) {
      state.templates = action.payload;
    },
  },
});

export const { setSelectedTemplate, setTemplates } = templateSlice.actions;
export default templateSlice.reducer;
