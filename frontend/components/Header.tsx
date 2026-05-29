'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCarrinhoStore } from '@/store/carrinho.store';

export function Header() {
  const itens = useCarrinhoStore((state) => state.itens);
  const total = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <header className="bg-[#3b3dbf] px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-white font-semibold text-lg">
        Início
      </Link>
      <Link href="/carrinho" className="relative text-white">
        <ShoppingCart size={24} />
        {total > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {total}
          </span>
        )}
      </Link>
    </header>
  );
}