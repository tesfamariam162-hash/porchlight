import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { CustomerDto } from '@porchlight/shared';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(6, 'Phone is required'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function CustomerEditForm({
  customer,
  onSubmit,
  loading,
}: {
  customer: CustomerDto;
  onSubmit: (values: FormValues) => void;
  loading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      notes: customer.notes ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
      <label className="block">
        Name
        <input {...register('name')} className="mt-1 w-full rounded-lg border px-3 py-2" />
        {errors.name ? <span className="text-xs text-red-600">{errors.name.message}</span> : null}
      </label>
      <label className="block">
        Email
        <input type="email" {...register('email')} className="mt-1 w-full rounded-lg border px-3 py-2" />
        {errors.email ? <span className="text-xs text-red-600">{errors.email.message}</span> : null}
      </label>
      <label className="block">
        Phone
        <input {...register('phone')} className="mt-1 w-full rounded-lg border px-3 py-2" />
        {errors.phone ? <span className="text-xs text-red-600">{errors.phone.message}</span> : null}
      </label>
      <label className="block">
        Notes
        <textarea rows={3} {...register('notes')} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-navy-900 px-4 py-2 text-white disabled:opacity-60"
      >
        {loading ? 'Saving…' : 'Save customer'}
      </button>
    </form>
  );
}
