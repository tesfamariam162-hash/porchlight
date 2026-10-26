import type { ApartmentImageDto } from '@porchlight/shared';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export function ImageGallery({ images }: { images: ApartmentImageDto[] }) {
  const sorted = useMemo(
    () => [...images].sort((a, b) => a.sortOrder - b.sortOrder),
    [images],
  );
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = sorted[index];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll every 4 seconds, pause on hover
  useEffect(() => {
    if (sorted.length <= 1 || paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i === sorted.length - 1 ? 0 : i + 1));
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sorted.length, paused]);

  if (!sorted.length) {
    return (
      <div className="aspect-[16/10] rounded-3xl bg-slate-200" aria-label="No images available" />
    );
  }

  const prev = () => {
    setIndex((i) => (i === 0 ? sorted.length - 1 : i - 1));
  };
  const next = () => {
    setIndex((i) => (i === sorted.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="space-y-4">
      <div
        className="group relative aspect-[16/8] overflow-hidden rounded-lg bg-slate-900 shadow-xl shadow-navy-950/10 sm:aspect-[16/7] sm:rounded-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img
          key={current.url}
          src={current.url}
          alt={current.alt ?? 'Apartment photo'}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Progress bar */}
        {sorted.length > 1 && !paused ? (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
            <div
              key={index}
              className="h-full bg-accent"
              style={{ animation: 'progress 2s linear forwards' }}
            />
          </div>
        ) : null}

        {/* Counter pill */}
        <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-navy-950/75 px-3.5 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-md">
          {index + 1} / {sorted.length}
        </div>

        {sorted.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-2xl bg-white/90 p-3 text-navy-900 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-accent hover:text-white active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-2xl bg-white/90 p-3 text-navy-900 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-accent hover:text-white active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        {/* Dot indicators */}
        {sorted.length > 1 ? (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {sorted.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={clsx(
                  'rounded-full transition-all duration-300',
                  i === index
                    ? 'w-5 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80',
                )}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setIndex(i)}
              className={clsx(
                'relative h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 sm:h-20 sm:w-28 sm:rounded-2xl',
                i === index
                  ? 'border-accent shadow-md shadow-accent/20 scale-105 ring-2 ring-accent/30'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={img.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
