import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/apartments', label: 'Residences' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-cream">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* Left — branding */}
        <Link to="/" className="flex flex-col items-start">
          <p className="font-display text-base font-medium tracking-[0.22em] text-cream sm:text-xl sm:tracking-[0.28em]">
            PORCHLIGHT
          </p>
          <p className="text-[9px] uppercase tracking-[0.28em] text-sage sm:text-[10px]">Bole · Addis Ababa</p>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                clsx(
                  'text-xs font-medium uppercase tracking-[0.18em] transition',
                  isActive ? 'text-sage' : 'text-cream/80 hover:text-cream',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-cream"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="editorial-panel border-t border-cream/10 px-6 py-6 lg:hidden" aria-label="Mobile">
          <ul className="space-y-4">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      'font-display text-2xl tracking-wide',
                      isActive ? 'text-sage' : 'text-cream',
                    )
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
