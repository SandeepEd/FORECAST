import React from 'react';

export class ErrorBoundary extends React.Component<
{ children: JSX.Element }, { hasError: boolean, error: Error | null }
> {
  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    const { children } = this.props;
    const { error, hasError } = this.state;

    if (hasError) {
      return <>
        <h1>Something went wrong, please try again later</h1>
        <h2>{error?.message}</h2>
      </>;
    }

    return children;
  }
}
