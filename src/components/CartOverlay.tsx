"use client";

import React from 'react';
import Image from 'next/image';
import type { Product } from '@/data/products';

type Props = {
  cart: string[];
  products: Product[];
  show: boolean;
  collapsed: boolean;
  toggleCart: (id: string) => void;
  onMinimize: () => void;
  onOpen: () => void;
  onOrder: () => void;
};

export default function CartOverlay({ cart, products, show, collapsed, toggleCart, onMinimize, onOpen, onOrder }: Props) {
  // intermittent pulse to hint the minimized bar wants opening
  const [pulse, setPulse] = React.useState(false);
  React.useEffect(() => {
    // only pulse when minimized and there are items
    if (!collapsed || !cart || cart.length === 0) return;
    let mounted = true;
    let timer = 0 as unknown as number;
    const run = () => {
      if (!mounted) return;
      setPulse(true);
      // shorter, sharper pulse
      window.setTimeout(() => { if (mounted) setPulse(false); }, 450);
      // next interval 0.8s - 1.8s (more frequent)
      const next = 800 + Math.random() * 1000;
      timer = window.setTimeout(run, next);
    };
    // start after a small random delay
    timer = window.setTimeout(run, 400 + Math.random() * 800);
    return () => { mounted = false; window.clearTimeout(timer); };
  }, [collapsed, cart]);

  return (
    <>
      {show && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[min(980px,95%)] bg-black/80 backdrop-blur-sm rounded-xl p-4 z-50 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Your Cart ({cart.length})</div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={onMinimize} aria-label="Minimize cart" className="text-white/70 hover:text-white">Minimize</button>
              <button type="button" onClick={onOrder} aria-label="Copy order and open Instagram" className="text-white/70 hover:text-white">Copy<span className="opacity-50">&</span>Order</button>
            </div>
          </div>
          <div className="max-h-[156px] overflow-y-auto custom-scrollbar">
            {cart.length === 0 ? (
              <div className="text-white/70">Your cart is empty.</div>
            ) : (
              <ul className="flex flex-col gap-2">
        {cart.map((id: string) => {
                  const p = products.find(x => x.id === id);
                  if (!p) return null;
                  return (
                    <li key={id} className="flex items-center gap-3 h-12">
                      <div className="w-12 h-12 relative rounded-md overflow-hidden bg-black/20">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-sm text-white/70">$ {p.price}</div>
                      </div>
          <button type="button" onClick={() => toggleCart(id)} aria-label={`Remove ${p.name} from cart`} className="text-white/70 hover:text-white">Remove</button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      )}

      {!show && collapsed && cart.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 bg-black/80 text-white rounded-full px-3 py-2 shadow-md hover:brightness-105">
            <button onClick={onOpen} className="flex items-center gap-2 shrink-0" aria-label="Open cart">
              {/* upward arrow hint icon; pulses upward occasionally to signal closed state */}
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-white transform transition-all duration-300 ease-out ${pulse ? '-translate-y-2 scale-110' : ''}`}>
                {/* simple triangle/chevron arrowhead pointing up */}
                <path d="M6 0L12 8H0L6 0Z" fill="currentColor" />
              </svg>
            </button>

            <div
              className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-hide min-w-0 transition-[width] duration-150"
              style={{ width: `${Math.min(136, cart.length * 40 + Math.max(0, cart.length - 1) * 8)}px` }}
              aria-hidden={cart.length === 0}
            >
              {cart.map((id: string) => {
                const p = products.find(x => x.id === id);
                if (!p) return null;
                return (
                  <div key={id} className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={p.image} alt={p.name} width={40} height={40} className="object-cover" />
                  </div>
                )
              })}
            </div>

            <div className="ml-1">
              <span className="bg-primary px-2 py-1 rounded-full text-xs font-semibold" role="status" aria-live="polite">{cart.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
