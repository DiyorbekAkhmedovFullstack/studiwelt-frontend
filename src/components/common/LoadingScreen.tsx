import { LoadingSpinner } from './LoadingSpinner';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-4">
      <div className="text-center">
        <LoadingSpinner />
        {message && (
          <p className="mt-4 text-sm text-text-muted">{message}</p>
        )}
      </div>
    </div>
  );
}
