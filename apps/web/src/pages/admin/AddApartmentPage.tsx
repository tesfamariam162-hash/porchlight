import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AVAILABILITY_STATUSES } from '@porchlight/shared';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { createApartment } from '../../services/apartmentsApi';
import { fetchAmenities } from '../../services/amenitiesApi';
import { getApiErrorMessage } from '../../lib/apiClient';

const inputCls = 'mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

export function AddApartmentPage() {
  useDocumentTitle('Add Apartment');
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedPreviews, setUploadedPreviews] = useState<{ name: string; dataUrl: string }[]>([]);
  const [imageUrls, setImageUrls] = useState('');

  const [form, setForm] = useState({
    number: '', description: '', location: 'Bole, Addis Ababa',
    floor: '', bedrooms: '1', size: '', price: '0',
    availabilityStatus: 'Available', availableFrom: '',
  });

  const amenitiesQuery = useQuery({ queryKey: ['amenities'], queryFn: fetchAmenities });

  const mutation = useMutation({
    mutationFn: () => {
      const urls = [
        ...uploadedPreviews.map((p) => p.dataUrl),
        ...imageUrls.split('\n').map((s) => s.trim()).filter(Boolean),
      ];
      return createApartment({
        name: `Unit ${form.number}`,
        number: form.number,
        description: form.description,
        type: 'Apartment',
        location: form.location,
        floor: form.floor ? Number(form.floor) : null,
        bedrooms: Number(form.bedrooms),
        bathrooms: 1,
        size: form.size ? Number(form.size) : null,
        price: Number(form.price),
        availabilityStatus: form.availabilityStatus,
        availableFrom: form.availableFrom || null,
        amenityIds: amenitiesQuery.data?.map((a) => a.id) ?? [],
        images: urls.map((url, i) => ({ url, sortOrder: i, isPrimary: i === 0 })),
      });
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin', 'apartments'] });
      await qc.invalidateQueries({ queryKey: ['apartments'] });
      navigate('/admin/apartments');
    },
    onError: (e) => setError(getApiErrorMessage(e)),
  });

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files ?? []).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setUploadedPreviews((prev) => [...prev, { name: file.name, dataUrl: reader.result as string }]);
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link to="/admin/apartments" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent">New Inventory</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">Add Apartment</h1>
          <div className="mt-2 h-1 w-12 rounded-full bg-accent" />
          <p className="mt-2 text-sm text-slate-500">Create and publish a new furnished apartment residence.</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}>
        {/* Basic info */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Apartment Info</p>
          <label className="block text-sm">
            <span className="font-semibold text-slate-700">Unit Number <span className="text-red-500">*</span></span>
            <input required value={form.number} onChange={set('number')} className={inputCls} placeholder="e.g. A-101" />
          </label>
          <label className="block text-sm">
            <span className="font-semibold text-slate-700">Location</span>
            <input value={form.location} onChange={set('location')} className={inputCls} />
          </label>
          <label className="block text-sm">
            <span className="font-semibold text-slate-700">Description <span className="text-red-500">*</span></span>
            <textarea required rows={3} value={form.description} onChange={set('description')} className={inputCls} placeholder="Describe the apartment…" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-semibold text-slate-700">Price (ETB/mo) <span className="text-red-500">*</span></span>
              <input required type="number" min="0" value={form.price} onChange={set('price')} className={inputCls} />
            </label>
            <label className="block text-sm">
              <span className="font-semibold text-slate-700">Bedrooms</span>
              <input type="number" min="0" value={form.bedrooms} onChange={set('bedrooms')} className={inputCls} />
            </label>
            <label className="block text-sm">
              <span className="font-semibold text-slate-700">Size (m²)</span>
              <input type="number" min="0" value={form.size} onChange={set('size')} className={inputCls} placeholder="Optional" />
            </label>
            <label className="block text-sm">
              <span className="font-semibold text-slate-700">Floor</span>
              <input type="number" value={form.floor} onChange={set('floor')} className={inputCls} placeholder="Optional" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-semibold text-slate-700">Availability</span>
              <select value={form.availabilityStatus} onChange={set('availabilityStatus')} className={inputCls}>
                <option value="Available">Available Now</option>
                <option value="Coming Soon">Available Later (set date below)</option>
                <option value="Occupied">Currently Unavailable</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-semibold text-slate-700">Available From</span>
              <input type="date" value={form.availableFrom} onChange={set('availableFrom')} className={inputCls} />
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Images</p>
          <button type="button" onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-4 text-sm text-slate-500 transition hover:border-navy-900/30 hover:bg-slate-50">
            <ImagePlus className="h-4 w-4" /> Upload from device
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
          {uploadedPreviews.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {uploadedPreviews.map((p, i) => (
                <div key={i} className="relative h-16 w-20 overflow-hidden rounded-lg border border-slate-200">
                  <img src={p.dataUrl} alt="" className="h-full w-full object-cover" />
                  <button type="button" onClick={() => setUploadedPreviews((prev) => prev.filter((_, j) => j !== i))}
                    className="absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white hover:bg-black/80">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="block text-sm">
            <span className="text-xs text-slate-400">Or paste image URLs (one per line)</span>
            <textarea rows={2} value={imageUrls} onChange={(e) => setImageUrls(e.target.value)}
              className={`${inputCls} font-mono text-xs`} placeholder="https://example.com/image.jpg" />
          </label>
        </div>

        {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-between">
          <Link to="/admin/apartments" className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Cancel
          </Link>
          <button type="submit" disabled={mutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-sm font-bold text-white shadow-sm shadow-accent/25 transition hover:bg-accent-hover disabled:opacity-60">
            {mutation.isPending ? 'Saving…' : 'Add Apartment'}
          </button>
        </div>
      </form>
    </div>
  );
}
