import { AlertCircle } from 'lucide-react';

export function ErrorState({
  message = 'Something went wrong.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
      <AlertCircle className="h-10 w-10 text-red-500" aria-hidden />
      <p className="max-w-md text-slate-700">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
