import { useEffect } from 'react';

const DEFAULT_DESCRIPTION =
  'Porchlight Apartment — modern furnished apartments in Bole, Addis Ababa, Ethiopia.';

export function usePageMeta(title: string, description?: string): void {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title.includes('Porchlight') ? title : `${title} | Porchlight Apartment`;

    let meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta?.getAttribute('content') ?? DEFAULT_DESCRIPTION;
    const nextDescription = description ?? DEFAULT_DESCRIPTION;
    if (meta) meta.setAttribute('content', nextDescription);
    else {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      meta.setAttribute('content', nextDescription);
      document.head.appendChild(meta);
    }

    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute('content', prevDescription);
    };
  }, [title, description]);
}
