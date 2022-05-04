import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasErrored: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasErrored: false
  }
  
  static getDerivedStateFromError (err: Error) {
    return { hasErrored: true }
  }
  componentDidCatch (err: Error, info: ErrorInfo) {
    console.log(err);
  }
  render () {
    if (this.state.hasErrored) {
      return <img alt='' src='../../assets/404.png' />
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
