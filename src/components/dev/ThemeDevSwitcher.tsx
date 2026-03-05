'use client';

import { useState, useEffect } from 'react';

const themes = [
  // General purpose
  { value: 'warm',     label: 'Warm',     swatch: '#c2410c', bg: '#fffbeb', category: 'General' },
  { value: 'cool',     label: 'Cool',     swatch: '#0e7490', bg: '#f0f9ff', category: 'General' },
  { value: 'earth',    label: 'Earth',    swatch: '#166534', bg: '#fefce8', category: 'General' },
  { value: 'bold',     label: 'Bold',     swatch: '#be123c', bg: '#fafafa', category: 'General' },
  { value: 'minimal',  label: 'Minimal',  swatch: '#18181b', bg: '#ffffff', category: 'General' },
  { value: 'dark',     label: 'Dark',     swatch: '#f97316', bg: '#111827', category: 'General' },
  // Cuisine-specific
  { value: 'rustic',   label: 'Rustic',   swatch: '#b84c30', bg: '#fdf6ef', category: 'Cuisine' },
  { value: 'sakura',   label: 'Sakura',   swatch: '#c0395a', bg: '#fdfafb', category: 'Cuisine' },
  { value: 'ocean',    label: 'Ocean',    swatch: '#0b7a85', bg: '#f5fbfc', category: 'Cuisine' },
  { value: 'spice',    label: 'Spice',    swatch: '#d4621a', bg: '#fffaf4', category: 'Cuisine' },
  { value: 'bistro',   label: 'Bistro',   swatch: '#b8966e', bg: '#fafaf7', category: 'Cuisine' },
  { value: 'smoke',    label: 'Smoke',    swatch: '#d4821a', bg: '#141210', category: 'Cuisine' },
  { value: 'fiesta',   label: 'Fiesta',   swatch: '#bf4a1e', bg: '#fffcf0', category: 'Cuisine' },
  { value: 'lantern',  label: 'Lantern',  swatch: '#c41a1a', bg: '#fffaf0', category: 'Cuisine' },
  { value: 'olive',    label: 'Olive',    swatch: '#4d7c59', bg: '#fafaf4', category: 'Cuisine' },
  { value: 'craft',    label: 'Craft',    swatch: '#8b5e2a', bg: '#fdf8ec', category: 'Cuisine' },
  { value: 'tropical', label: 'Tropical', swatch: '#0e7f6c', bg: '#f5fffb', category: 'Cuisine' },
  { value: 'cafe',     label: 'Cafe',     swatch: '#5c3d1e', bg: '#fdfaf4', category: 'Cuisine' },
  { value: 'rose',     label: 'Rose',     swatch: '#be5070', bg: '#fff8f9', category: 'Cuisine' },
  { value: 'noir',     label: 'Noir',     swatch: '#c02035', bg: '#0c0a0e', category: 'Cuisine' },
];

export default function ThemeDevSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('warm');

  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme');
    if (t) setActive(t);
  }, []);

  const applyTheme = (value: string) => {
    document.documentElement.setAttribute('data-theme', value);
    setActive(value);
  };

  return (
    <div className="fixed bottom-20 left-4 z-[200] font-sans text-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Dev Theme Switcher"
        className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center
                   bg-white border border-gray-200 hover:scale-110 transition-transform text-lg"
      >
        🎨
      </button>

      {open && (
        <div className="absolute bottom-12 left-0 bg-white rounded-xl shadow-2xl border border-gray-200
                        p-3 w-52 animate-fade-in">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Dev Theme Switcher
          </p>

          <div className="max-h-[400px] overflow-y-auto pr-0.5 space-y-3">
            {(['General', 'Cuisine'] as const).map((cat) => (
              <div key={cat}>
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-1 mb-1">
                  {cat}
                </p>
                <div className="space-y-0.5">
                  {themes.filter((t) => t.category === cat).map((t) => (
                    <button
                      key={t.value}
                      onClick={() => applyTheme(t.value)}
                      className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left
                                  transition-colors text-gray-700
                                  ${active === t.value ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
                    >
                      <span className="w-5 h-5 rounded-full shrink-0 border border-gray-200 overflow-hidden flex">
                        <span className="w-1/2 h-full" style={{ background: t.bg }} />
                        <span className="w-1/2 h-full" style={{ background: t.swatch }} />
                      </span>
                      <span className="text-xs">{t.label}</span>
                      {active === t.value && (
                        <span className="ml-auto text-xs text-green-500">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[9px] text-gray-300 text-center mt-2 pt-2 border-t border-gray-100">
            Only visible in dev mode
          </p>
        </div>
      )}
    </div>
  );
}
