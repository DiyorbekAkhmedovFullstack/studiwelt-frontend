import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Icon } from '../../lib/icons';
import { useAuth } from '../../contexts/AuthContext';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  isAdmin?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export function ErrorBoundaryWithAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return (
    <ErrorBoundary isAdmin={user?.role === 'ADMIN'}>
      {children}
    </ErrorBoundary>
  );
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-page p-4 relative overflow-hidden">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#EBE5DA] -top-[100px] -left-[100px] blur-[60px] opacity-60 -z-10"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#E3D4C5] -bottom-[50px] -right-[50px] blur-[60px] opacity-60 -z-10"></div>
          <div className="w-full max-w-[520px] bg-surface rounded-[24px] shadow-[0_10px_40px_rgba(62,54,48,0.08)] p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-danger/10 flex items-center justify-center">
              <Icon.Warning className="h-10 w-10 text-danger" stroke={2.5} />
            </div>
            <h1 className="mb-4 text-[28px] font-serif font-bold text-text-main">
              Something went wrong
            </h1>
            <p className="mb-8 text-[16px] text-text-muted leading-relaxed max-w-[400px] mx-auto">
              We're sorry, but something unexpected happened. Please try again.
            </p>
            {this.state.error && this.props.isAdmin && (
              <details className="mb-8 text-left rounded-xl bg-highlight p-4 border border-border">
                <summary className="cursor-pointer text-sm font-medium text-text-muted hover:text-text-main">
                  Technical details
                </summary>
                <pre className="mt-3 p-3 bg-page rounded-lg text-xs text-danger overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full px-4 py-4 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(166,123,91,0.3)] hover:bg-primary-hover hover:-translate-y-0.5"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-4 py-4 bg-surface text-text-main border-2 border-[rgba(166,123,91,0.2)] rounded-lg text-base font-semibold cursor-pointer transition-all hover:border-primary hover:bg-[#FFFCF8]"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
