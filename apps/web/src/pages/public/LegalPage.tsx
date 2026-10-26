import { Link } from 'react-router-dom';
import { COMPANY } from '@porchlight/shared';
import {
  ShieldCheck,
  FileText,
  Lock,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Check,
  Scale,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// ─────────────────────────────────────────────────────────────
// PRIVACY POLICY (STREAMLINED)
// ─────────────────────────────────────────────────────────────
export function PrivacyPage() {
  useDocumentTitle('Privacy Policy — Porchlight');

  return (
    <LegalShell
      activeTab="privacy"
      badge="Privacy & Data Protection"
      title="Privacy Policy"
      subtitle="A straightforward summary of how Porchlight Apartment handles and protects your information in Bole, Addis Ababa."
      lastUpdated="October 2026"
    >
      {/* ── Key Commitments ── */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Lock className="h-4 w-4" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-navy-950">No Data Selling</h3>
          <p className="mt-1 text-xs text-slate-500">We never sell, rent, or trade your contact info with third-party advertisers.</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Check className="h-4 w-4" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-navy-950">Tenancy Focus</h3>
          <p className="mt-1 text-xs text-slate-500">Data is collected solely to answer inquiries, process leases, and support residents.</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-navy-950">Private Suites</h3>
          <p className="mt-1 text-xs text-slate-500">CCTV cameras monitor common gates and parking only — never inside private apartments.</p>
        </div>
      </div>

      {/* ── Section 1: Overview ── */}
      <section className="space-y-3 pt-4">
        <h2 className="font-display text-lg font-bold text-navy-950 sm:text-xl">1. Overview &amp; Scope</h2>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          This Privacy Policy applies to website visitors, prospective tenants, and residents of <strong>{COMPANY.name}</strong> (&ldquo;Porchlight&rdquo;) in Bole, Addis Ababa, Ethiopia. We operate 24 fully furnished 2-bedroom and 3-bedroom residences and respect your personal privacy.
        </p>
      </section>

      {/* ── Section 2: Information We Collect ── */}
      <section className="space-y-3 pt-2">
        <h2 className="font-display text-lg font-bold text-navy-950 sm:text-xl">2. Information We Collect</h2>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          We collect only the essential details needed to communicate with you and coordinate apartment leases:
        </p>
        <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          <li className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span><strong>Inquiries:</strong> Name, phone / WhatsApp, email, preferred move-in date, and apartment layout (2 or 3 bedroom).</span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span><strong>Lease Verification:</strong> Government-issued ID (Kebele ID, National ID, or Passport) and payment receipts for confirmed tenants.</span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span><strong>Vehicle Info:</strong> License plate details to assign reserved parking and gate clearance.</span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span><strong>Common CCTV:</strong> Security footage at main gate, lobby, and parking for building safety.</span>
          </li>
        </ul>
      </section>

      {/* ── Section 3: How We Use & Protect Data ── */}
      <section className="space-y-3 pt-2">
        <h2 className="font-display text-lg font-bold text-navy-950 sm:text-xl">3. How We Use &amp; Protect Data</h2>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          Your information is used strictly to answer your questions, arrange tours, draft lease agreements, and deliver property services (including 24/7 backup power and reserve water coordination). We protect all data using SSL encryption and role-restricted access. We never sell or share your information with outside marketers.
        </p>
      </section>

      {/* ── Section 4: Your Rights ── */}
      <section className="space-y-3 pt-2">
        <h2 className="font-display text-lg font-bold text-navy-950 sm:text-xl">4. Your Rights &amp; Contact</h2>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          You may request to review, update, or remove your contact information from our active inquiry lists at any time by contacting our management office at <a href={`mailto:${COMPANY.email}`} className="font-medium text-accent hover:underline">{COMPANY.email}</a> or visiting us in Bole.
        </p>
      </section>
    </LegalShell>
  );
}

// ─────────────────────────────────────────────────────────────
// TERMS OF SERVICE (STREAMLINED)
// ─────────────────────────────────────────────────────────────
export function TermsPage() {
  useDocumentTitle('Terms of Service — Porchlight');

  return (
    <LegalShell
      activeTab="terms"
      badge="Agreement & Guidelines"
      title="Terms of Service"
      subtitle="Clear and simple terms governing website usage, apartment inquiries, and community standards at Porchlight in Bole, Addis Ababa."
      lastUpdated="October 2026"
    >
      {/* ── Key Commitments ── */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <AlertCircle className="h-4 w-4" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-navy-950">Inquiries Are Exploratory</h3>
          <p className="mt-1 text-xs text-slate-500">Website inquiries do not hold or reserve a unit until a lease is signed and deposit received.</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Building2 className="h-4 w-4" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-navy-950">Residential Use</h3>
          <p className="mt-1 text-xs text-slate-500">Suites are reserved for peaceful residential living. Commercial parties and subletting are prohibited.</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Scale className="h-4 w-4" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-navy-950">Ethiopian Law</h3>
          <p className="mt-1 text-xs text-slate-500">All agreements are governed under the laws of the Federal Democratic Republic of Ethiopia.</p>
        </div>
      </div>

      {/* ── Section 1: Inquiries & Reservations ── */}
      <section className="space-y-3 pt-4">
        <h2 className="font-display text-lg font-bold text-navy-950 sm:text-xl">1. Inquiries &amp; Apartment Availability</h2>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          All descriptions, photos, and indicative pricing on this website are provided for informational guidance. Submitting an inquiry or scheduling a tour does <strong>not</strong> guarantee a reservation. A confirmed tenancy is created exclusively upon signing an official Porchlight Lease Agreement, presenting valid government identification, and paying the security deposit.
        </p>
      </section>

      {/* ── Section 2: Inclusions & Redundant Utilities ── */}
      <section className="space-y-3 pt-2">
        <h2 className="font-display text-lg font-bold text-navy-950 sm:text-xl">2. Furnishings &amp; Building Facilities</h2>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          Our 24 residences in Bole are furnished with essential appliances, living furniture, linens, and private en-suite bathrooms. Tenancy includes access to 24/7 dedicated generator power backup, reserve water storage, high-speed Wi-Fi, elevator access, and assigned parking.
        </p>
      </section>

      {/* ── Section 3: Community Guidelines & House Rules ── */}
      <section className="space-y-3 pt-2">
        <h2 className="font-display text-lg font-bold text-navy-950 sm:text-xl">3. Occupancy &amp; Community Rules</h2>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          To maintain tranquility and safety for all residents:
        </p>
        <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          <li className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span><strong>Quiet Hours:</strong> Observed daily between 10:00 PM and 7:00 AM.</span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span><strong>No Subletting:</strong> Re-listing units on platforms like Airbnb without consent is strictly prohibited.</span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span><strong>Security Check-In:</strong> All visitors must register with 24/7 security personnel at the gate.</span>
          </li>
          <li className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span><strong>Max Occupancy:</strong> Adherence to agreed occupant limits (2-bedroom or 3-bedroom suite limits).</span>
          </li>
        </ul>
      </section>

      {/* ── Section 4: Payments & Legal Jurisdiction ── */}
      <section className="space-y-3 pt-2">
        <h2 className="font-display text-lg font-bold text-navy-950 sm:text-xl">4. Payments, Deposits &amp; Governing Law</h2>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          Rental fees and security deposits are payable via bank transfer, cashier&rsquo;s cheque, or authorized electronic payments (such as telebirr) in accordance with National Bank of Ethiopia regulations. A refundable deposit is held against unit damages. These terms are governed by the laws of the Federal Democratic Republic of Ethiopia, with jurisdiction in Addis Ababa.
        </p>
      </section>
    </LegalShell>
  );
}

// ─────────────────────────────────────────────────────────────
// REUSABLE STREAMLINED LEGAL SHELL
// ─────────────────────────────────────────────────────────────
interface LegalShellProps {
  activeTab: 'privacy' | 'terms';
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
}

function LegalShell({
  activeTab,
  badge,
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalShellProps) {
  return (
    <div className="bg-white">
      {/* ── Header ── */}
      <header className="relative overflow-hidden bg-gradient-to-b from-slate-50/90 via-white to-slate-50/30 border-b border-slate-200/80 py-10 sm:py-14">
        {/* Subtle glowing ambient lighting */}
        <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-sky-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Kicker Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1 shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent sm:text-xs">
              {badge} · Bole, Addis Ababa
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {subtitle}
          </p>

          {/* Metadata Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-xs font-medium text-slate-700">
              <Calendar className="h-3 w-3 text-accent" />
              Effective: {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-xs font-medium text-slate-700">
              <MapPin className="h-3 w-3 text-accent" />
              Bole, Addis Ababa
            </span>
          </div>

          {/* Interactive Navigation Switcher Tabs */}
          <div className="mt-8 inline-flex items-center rounded-xl border border-slate-200 bg-slate-100/90 p-1 shadow-xs">
            <Link
              to="/privacy"
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'privacy'
                  ? 'bg-navy-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-950 hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'terms'
                  ? 'bg-navy-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-950 hover:bg-white/60'
              }`}
            >
              <FileText className="h-4 w-4" />
              Terms of Service
            </Link>
          </div>
        </div>
      </header>

      {/* ── Document Body ── */}
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="space-y-8">{children}</div>

        {/* ── Management Office Contact Card ── */}
        <div className="mt-12 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Questions &amp; Legal Notices</p>
              <h3 className="font-display text-lg font-bold text-navy-950 sm:text-xl">Porchlight Management Office</h3>
              <p className="text-xs text-slate-600 sm:text-sm">
                Bole, Addis Ababa, Ethiopia · {COMPANY.workingHours}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-accent-hover"
              >
                <Mail className="h-3.5 w-3.5" />
                Email Us
              </a>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-navy-950 shadow-xs transition hover:bg-slate-50"
              >
                <Phone className="h-3.5 w-3.5 text-accent" />
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
