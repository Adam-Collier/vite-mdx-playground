import { evaluate } from 'xdm';
import React, { useState, useMemo } from 'react';
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

const getContent = async (mdx, setCode, setError) => {
  try {
    const { default: content } = await evaluate(mdx, {
      ...runtime,
      useDynamicImport: true,
    });

    setError(null);
    setCode(content);
  } catch (error) {
    setError(error);
  }
};

const Content = ({ mdx }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  useMemo(() => {
    getContent(mdx, setCode, setError);
  }, [mdx]);

  return (
    <div>
      {code}
      {error && error.message}
    </div>
  );
};

export const Playground = () => {
  const [mdx, setMDX] = useState('');

  return (
    <Wrapper>
      <Editor initialValue={mdx} setMDX={setMDX} />
      <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={mdx}>
        <Content mdx={mdx} />
      </ErrorBoundary>
    </Wrapper>
  );
};
