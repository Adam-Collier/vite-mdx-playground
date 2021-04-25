import { evaluateSync } from 'xdm';
import { Row } from 'react-bootstrap';
import React, { useState } from 'react';
import * as runtime from 'react/jsx-runtime.js';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';

const Wrapper = styled.div`
  display: flex;

  > * {
    flex: 1 1 auto;
  }
`;

const Content = ({ mdx }) => {
  try {
    const { default: Content } = evaluateSync(mdx, runtime);
    return (
      <div>
        <Content components={{ Row }} />
      </div>
    );
  } catch (error) {
    return <div>{error.message}</div>;
  }
};

export const Playground = () => {
  const [mdx, setMDX] = useState('# This is some content');

  const handleChange = (value) => {
    setMDX(value);
  };

  return (
    <Wrapper>
      {/* <textarea value={mdx} /> */}
      <Editor
        height="80vh"
        theme="vs-dark"
        onChange={handleChange}
        defaultLanguage="markdown"
        defaultValue={mdx}
      />
      <Content mdx={mdx} />
    </Wrapper>
  );
};
