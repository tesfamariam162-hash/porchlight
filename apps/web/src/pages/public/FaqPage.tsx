import { COMPANY } from '@porchlight/shared';
import { useState } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const FAQ = [
  { q: 'What apartment types are available?', a: 'We offer studio, one-bedroom, and two-bedroom fully furnished units. Browse current listings for live availability.' },
  { q: 'Are apartments furnished?', a: 'Yes. Every unit includes furniture and essential household items for comfortable move-in.' },
  { q: 'What facilities are included?', a: 'Typical facilities include parking, WiFi, generator backup, 24/7 security, CCTV, laundry support, refrigerator, and in-unit washer & dryer.' },
  { q: 'Is WiFi included?', a: 'High-speed WiFi is available for residents. Details may vary by unit — ask our team when inquiring.' },
  { q: 'Is parking available?', a: 'Dedicated resident parking is available subject to unit and building allocation.' },
  { q: 'How is security handled?', a: 'The property includes 24/7 security personnel and CCTV monitoring.' },
  { q: 'Is there backup power?', a: 'A generator supports essential building systems during power outages.' },
  { q: 'Do units include washer and dryer?', a: 'Yes — in-unit washer and dryer are included in our furnished apartments.' },
  { q: 'How do I check availability?', a: 'View listings online for status badges, or contact us for the latest move-in dates.' },
  { q: 'How is pricing structured?', a: 'Monthly rent is shown on each listing. Contact us for current promotions or lease terms.' },
  { q: 'Where are you located?', a: `We are in Bole, Addis Ababa — ${COMPANY.address}.` },
  { q: 'What documents are required?', a: 'Typically valid ID, proof of income or employment, and lease agreement signing. Our team will confirm requirements for your stay.' },
];

export function FaqPage() {
  useDocumentTitle('FAQ');
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-accent">Help &amp; Resident Information</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">Frequently Asked Questions</h1>
        <div className="mt-2.5 h-1 w-12 rounded-full bg-accent" />
        <p className="mt-3 text-slate-500">Everything you need to know about living at Porchlight in Bole, Addis Ababa.</p>
      </div>
      <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <h2>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-navy-900 hover:bg-slate-50"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                  <span aria-hidden className="text-accent">{isOpen ? '−' : '+'}</span>
                </button>
              </h2>
              {isOpen ? (
                <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{item.a}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
