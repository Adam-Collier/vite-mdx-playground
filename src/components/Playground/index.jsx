import { evaluateSync } from 'xdm';
import { Row } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import * as runtime from 'react/jsx-runtime.js';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

import { Editor } from '../Editor';

const Wrapper = styled.div`
  display: flex;

  > * {
    flex: 1 1 auto;
  }
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <h2>Something went wrong.</h2>
      <pre>{error.message}</pre>
    </div>
  );
};

const Content = ({ mdx }) => {
  const { default: Content } = evaluateSync(mdx, runtime);
  return (
    <div>
      <Content components={{ Row }} />
    </div>
  );
};

export const Playground = () => {
  const [mdx, setMDX] = useState('# This is some content');

  return (
    <Wrapper>
      <Editor initialValue={mdx} setMDX={setMDX} />
      <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={mdx}>
        <Content mdx={mdx} />
      </ErrorBoundary>
    </Wrapper>
  );
};
