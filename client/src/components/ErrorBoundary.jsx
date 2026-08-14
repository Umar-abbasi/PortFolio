import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Render error caught by ErrorBoundary:', error, info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback !== undefined) return this.props.fallback;
      return (
        <section className="page-header">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <h1 className="section-title">Something went wrong</h1>
            <p className="section-sub" style={{ margin: '0 auto 30px' }}>
              This section hit an unexpected error. Try again, or reload the page.
            </p>
            <button className="btn btn-primary" onClick={() => this.setState({ error: null })}>
              Try Again →
            </button>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
