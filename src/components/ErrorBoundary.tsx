import React, { Component, ReactNode } from "react";
import { Notifier } from "@airbrake/browser";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public airbrake?: Notifier;
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
    this.airbrake = new Notifier({
      projectId: 482785,
      projectKey: "ca5f81794d6c0ac39e4e368e6416d9f0",
    });
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (this.airbrake) {
      this.airbrake.notify({
        error: error,
        params: { info: errorInfo },
      });
    } else {
      console.log({ error, errorInfo });
    }
  }

  render(): ReactNode {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
