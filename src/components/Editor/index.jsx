import React, { useRef, useEffect } from 'react';

// codemirror
import { basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

export const Editor = ({ initialValue, setMDX }) => {
  const editor = useRef(null);

  const onUpdate = EditorView.updateListener.of((view) => {
    setMDX(view.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: initialValue,
      extensions: [
        basicSetup,
        markdown(),
        keymap.of(defaultKeymap),
        oneDark,
        onUpdate,
      ],
    });

    const view = new EditorView({
      state,
      parent: editor.current,
    });

    return () => {
      view.destroy();
    };
  }, []);

  return <div ref={editor}></div>;
};
