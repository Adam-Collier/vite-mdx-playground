import React, { useState } from 'react';
import './App.css';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

function App() {
  return (
    <LiveProvider code="<strong>Hello World!</strong>">
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
}

export default App;
