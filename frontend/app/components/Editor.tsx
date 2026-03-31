'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setContent, undo, redo } from '../store/editorSlice';
import type { AppDispatch, RootState } from '../store';
import Button from './Button';

export default function Editor() {
  const dispatch = useDispatch<AppDispatch>();
  const content = useSelector((state: RootState) => state.editor.content);
  const canUndo = useSelector(
    (state: RootState) => state.editor.past.length > 0
  );
  const canRedo = useSelector(
    (state: RootState) => state.editor.future.length > 0
  );

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex flex-shrink-0 items-center gap-2 bg-white/[0.03] px-3 py-2 border-white/[0.06] border-b">
        <span className="font-semibold text-white/40 text-xs uppercase tracking-widest">
          Editor
        </span>
        <div className="flex gap-1 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(undo())}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
          >
            ↩ Undo
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(redo())}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            aria-label="Redo"
          >
            ↪ Redo
          </Button>
        </div>
      </div>
      <textarea
        className="flex-1 bg-transparent p-4 focus:outline-none w-full font-mono text-white/85 text-sm resize-none placeholder-white/20"
        value={content}
        onChange={(e) => dispatch(setContent(e.target.value))}
        placeholder="Your README markdown will appear here. You can also type directly..."
        spellCheck={false}
      />
    </div>
  );
}
