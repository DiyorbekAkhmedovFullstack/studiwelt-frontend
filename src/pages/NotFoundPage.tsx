import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-4">
      <div className="max-w-md rounded-xl bg-surface p-8 text-center shadow-lg border border-border-soft">
        <h1 className="mb-2 text-2xl font-semibold text-text-main">
          Page not found
        </h1>
        <p className="mb-4 text-sm text-text-muted">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-text-main hover:bg-primary-hover hover:text-page"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
