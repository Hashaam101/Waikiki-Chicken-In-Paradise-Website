"use client";

import React from 'react';
import Image from 'next/image';
import type { Product } from '@/data/products';

type Props = {
  product: Product;
  measureHeights: () => void;
};

export default function ProductCard({ product, measureHeights }: Props) {
  return (
    <div
      key={product.id}
      className="menu-card rounded-2xl overflow-hidden flex flex-col bg-[#240e0e] shadow-xl shadow-black/30 max-w-[340px] sm:max-w-[360px] w-full mx-auto"
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
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white font-semibold active:brightness-90 active:shadow-inner transition-colors bg-primary hover:bg-primary-dark"
        >
          More Details
        </button>
      </div>
    </div>
  );
}
