"use client";

import React from 'react';
import Image from 'next/image';
import type { Product } from '@/data/products';

type Props = {
  product: Product;
  inCart: boolean;
  toggleCart: (id: string) => void;
  measureHeights: () => void;
};

export default function ProductCard({ product, inCart, toggleCart, measureHeights }: Props) {
  return (
    <div
      key={product.id}
      className={`menu-card rounded-2xl overflow-hidden flex flex-col bg-[#240e0e] shadow-xl shadow-black/30 max-w-[340px] sm:max-w-[360px] w-full mx-auto ${inCart ? 'opacity-75' : ''}`}
    >
      <div className="relative w-full rounded-t-2xl overflow-hidden" style={{ maxHeight: '220px', height: '220px' }}>
        <Image src={product.image} alt={product.name} fill className="object-cover" onLoad={() => measureHeights()} />
      </div>

      <div className="flex flex-col flex-1 px-4 pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="font-bold text-white text-[18px] leading-tight">{product.name}</div>
          <div className="font-bold text-white text-[18px]">$ {product.price}</div>
        </div>
        <div className="mt-2 text-sm" style={{ color: '#d0c6bb' }}>{product.description}</div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => toggleCart(product.id)}
          className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white font-semibold active:brightness-90 active:shadow-inner transition-colors ${inCart ? 'bg-primary-dark hover:bg-primary-dark/95' : 'bg-primary hover:bg-primary-dark'}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10a4 4 0 1 1 2.5-7.16A5 5 0 0 1 19 6a3 3 0 1 1-1 5v1H7v-2Z" fill="currentColor"/>
            <path d="M7 13h10v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-5Z" fill="currentColor"/>
          </svg>
          {inCart ? 'In Cart' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
}
