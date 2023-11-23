import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorPage from './ErrorPage/ErrorPage';

export default function ReactErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
