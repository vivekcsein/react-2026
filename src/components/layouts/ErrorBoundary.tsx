import React, { type ReactNode } from "react";
import ErrorPage from "../features/home/ErrorPage";
type ErrorBoundaryState = {
  hasError: boolean;
  error: unknown;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", info);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
