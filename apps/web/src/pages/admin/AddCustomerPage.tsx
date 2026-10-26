import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Bath, BedDouble, Building2, MapPin, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { createCustomer } from '../../services/customersApi';
import { fetchApartments } from '../../services/apartmentsApi';
import { createInquiry } from '../../services/inquiriesApi';
import { formatPrice } from '../../utils/format';
import { getApiErrorMessage } from '../../lib/apiClient';

const inputCls =
  'mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

export function AddCustomerPage() {
  useDocumentTitle('Register New Customer');
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    description: '',
    apartmentId: '',
  });
  const [error, setError] = useState<string | null>(null);

  const apartmentsQuery = useQuery({
    queryKey: ['apartments', 'all'],
    queryFn: () => fetchApartments({}),
  });

  const selectedApartment = apartmentsQuery.data?.find((a) => a.id === form.apartmentId) ?? null;

  const mutation = useMutation({
    mutationFn: async () => {
      const notes = [form.notes, form.description].filter(Boolean).join(' — ');
      const customer = await createCustomer({
        name: form.name,
        email: form.email,
        phone: form.phone,
        notes: notes || undefined,
      });
      if (form.apartmentId) {
        await createInquiry({
          name: form.name,
          email: form.email,
          phone: form.phone,
          apartmentId: form.apartmentId,
          subject: 'Rental registration',
          message: form.description || 'Registered as tenant by admin.',
        });
      }
      return customer;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin', 'customers'] });
      await qc.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      navigate('/admin/customers');
    },
    onError: (e) => setError(getApiErrorMessage(e)),
  });

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Link
          to="/admin/customers"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-navy-900"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Registration</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">Register New Customer</h1>
          <div className="mt-2 h-1 w-12 rounded-full bg-accent" />
          <p className="mt-2 text-sm text-slate-500">Register a new tenant, guest, or inquiry lead to the directory.</p>
        </div>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        {/* ── Customer Info ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Customer Info</p>

          <label className="block">
            <span className="font-semibold text-slate-700">Full name <span className="text-red-500">*</span></span>
            <input required value={form.name} onChange={set('name')} className={inputCls} placeholder="e.g. Abebe Kebede" />
          </label>

          <label className="block">
            <span className="font-semibold text-slate-700">Email <span className="text-red-500">*</span></span>
            <input required type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="abebe@email.com" />
          </label>

          <label className="block">
            <span className="font-semibold text-slate-700">Phone <span className="text-red-500">*</span></span>
            <input required value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+251 911 000 000" />
          </label>

          <label className="block">
            <span className="font-semibold text-slate-700">Status</span>
            <select value={form.notes} onChange={set('notes')} className={inputCls}>
              <option value="">— Select status —</option>
              <option value="active">Active Tenant (currently renting)</option>
              <option value="in process">In Process (inquiry / pending)</option>
              <option value="past">Past Tenant (moved out)</option>
            </select>
          </label>
        </div>

        {/* ── Apartment ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Apartment (Optional)</p>

          <label className="block">
            <span className="font-semibold text-slate-700">Assign apartment</span>
            <select value={form.apartmentId} onChange={set('apartmentId')} className={inputCls}>
              <option value="">— None —</option>
              {(apartmentsQuery.data ?? []).map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} — Unit {a.number} ({formatPrice(a.price)}/mo)
                </option>
              ))}
            </select>
          </label>

          {selectedApartment ? (
            <div className="rounded-xl border border-navy-900/15 bg-slate-50 p-4">
              <div className="flex items-start gap-4">
                {selectedApartment.images[0] ? (
                  <img src={selectedApartment.images[0].url} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Building2 className="h-6 w-6 text-slate-400" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-navy-900">{selectedApartment.name}</p>
                  <p className="text-xs text-slate-400">Unit {selectedApartment.number} · {selectedApartment.type}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3 w-3 text-accent" />
                    {selectedApartment.location}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1">
                      <BedDouble className="h-3 w-3" /> {selectedApartment.bedrooms} bed
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1">
                      <Bath className="h-3 w-3" /> {selectedApartment.bathrooms} bath
                    </span>
                    <span className="inline-flex items-center rounded-full border border-navy-900/20 bg-navy-900/8 px-2.5 py-1 font-bold text-navy-900">
                      {formatPrice(selectedApartment.price)}/mo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* ── Description ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Additional Details</p>
          <label className="block">
            <span className="font-semibold text-slate-700">Description / Notes</span>
            <textarea
              rows={4}
              value={form.description}
              onChange={set('description')}
              className={inputCls}
              placeholder="Move-in date, special requirements, additional notes…"
            />
          </label>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        ) : null}

        {/* ── Actions ── */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/admin/customers"
            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-sm font-bold text-white shadow-sm shadow-accent/25 transition hover:bg-accent-hover disabled:opacity-60"
          >
            <UserPlus className="h-4 w-4" />
            {mutation.isPending ? 'Registering…' : 'Register Customer'}
          </button>
        </div>
      </form>
    </div>
  );
}
