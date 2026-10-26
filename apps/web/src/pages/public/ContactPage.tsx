import { COMPANY } from '@porchlight/shared';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { InquiryForm } from '../../components/forms/InquiryForm';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export function ContactPage() {
  useDocumentTitle('Contact — Porchlight Apartment');

  return (
    <div>
      {/* Header — plain text, no card */}
      <div className="mx-auto max-w-7xl px-3 pt-8 sm:px-6 sm:pt-14 lg:px-8">
        <p className="text-[9px] font-bold uppercase tracking-widest text-accent sm:text-xs">Reach Out</p>
        <h1 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-navy-950 sm:mt-3 sm:text-5xl">Contact Us</h1>
        <div className="mt-1.5 h-0.5 w-8 rounded-full bg-accent sm:mt-3 sm:h-1 sm:w-16" />
        <p className="mt-3 max-w-xl text-sm text-slate-500 sm:mt-4 sm:text-lg">
          Questions about availability, pricing, or viewing? Our team is ready to help.
        </p>
      </div>

      <div className="bg-slate-50 py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-10">

            {/* Left — Info */}
            <div className="space-y-5">
              {/* Contact cards */}
              {[
                { icon: MapPin, label: 'Address', value: COMPANY.address, href: undefined },
                { icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: 'Message on WhatsApp',
                  href: `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`,
                  external: true,
                },
                { icon: Clock, label: 'Working Hours', value: COMPANY.workingHours, href: undefined },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <div key={label} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent sm:h-10 sm:w-10 sm:rounded-xl">
                    <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                        className="mt-0.5 block truncate text-[10px] font-semibold text-navy-950 transition hover:text-accent sm:mt-1 sm:text-base"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-[10px] font-medium text-slate-700 sm:mt-1 sm:text-base">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.677421793918!2d38.78397397483259!3d9.00180039105844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85771a56ea35%3A0xba9aa88b7ce682!2sPorchlight%20apartments!5e0!3m2!1sen!2set!4v1789989139257!5m2!1sen!2set"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Porchlight Apartments location"
                />
            </div>
            </div>

            {/* Right — Form */}
            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-8">
              <p className="text-[9px] font-bold uppercase tracking-widest text-accent sm:text-xs">Send a Message</p>
              <h2 className="mt-1.5 font-display text-lg font-extrabold tracking-tight text-navy-950 sm:mt-3 sm:text-3xl">
                Get in Touch
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-accent" />
              <p className="mt-3 text-sm text-slate-500">We respond within one business day.</p>
              <div className="mt-6">
                <InquiryForm />
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-16">
            {/* Social icons */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Follow Us</p>
              <h2 className="mt-2 font-display text-xl font-extrabold text-navy-950 sm:text-2xl">Stay Connected</h2>
              <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-accent" />
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
                Follow us on social media for the latest updates and available units.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                {/* Facebook */}
                <a href={COMPANY.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </a>
                {/* Telegram */}
                <a href="https://t.me/porchlightapartment" target="_blank" rel="noreferrer" aria-label="Telegram"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href={COMPANY.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href={COMPANY.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
