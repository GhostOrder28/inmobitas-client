import React, { Component, ErrorInfo, ReactNode } from "react";
import { Text } from "evergreen-ui";

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
      return <Text>404 ERROR</Text>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
