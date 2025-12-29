export function LoadingSpinner() {
  return (
    <div className="text-center" role="status" aria-label="Loading">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="mt-4 text-text-muted">Loading...</p>
    </div>
  );
}

