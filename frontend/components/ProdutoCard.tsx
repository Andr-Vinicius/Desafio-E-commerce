'use client';

import { Produto } from '@/types';
import { useCarrinhoStore } from '@/store/carrinho.store';
import { useState } from 'react';

interface Props {
  produto: Produto;
}

// Imagem baseada no nome do produto
function getImagem(nome: string): string {
  const n = nome.toLowerCase();
  if (n.includes('camiseta')) return 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80';
  if (n.includes('calça') || n.includes('jeans')) return 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80';
  if (n.includes('tênis') || n.includes('tenis')) return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80';
  if (n.includes('boné') || n.includes('bone')) return 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80';
  if (n.includes('mochila')) return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80';
  return 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80';
}

export function ProdutoCard({ produto }: Props) {
  const adicionar = useCarrinhoStore((state) => state.insert);
  const [adicionado, setAdicionado] = useState(false);

  const handleAdicionar = async () => {
    await adicionar({
      produtoId: produto.id,
      nome: produto.nome,
      preco: Number(produto.preco),
      quantidade: 1,
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1500);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden flex flex-col">
      <div className="bg-white p-4 flex items-center justify-center h-52">
        <img
          src={getImagem(produto.nome)}
          alt={produto.nome}
          className="h-full object-contain"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1 bg-[#1c1f2e]">
        <p className="text-white text-sm font-medium leading-snug">{produto.nome}</p>
        <p className="text-blue-400 font-bold text-lg">
          R$ {Number(produto.preco).toFixed(2).replace('.', ',')}
        </p>

        <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">
        {produto.descricao}
      </p>
          <button
            onClick={handleAdicionar}
            className="w-full bg-[#3b3dbf] hover:bg-blue-700 text-white text-sm py-2 rounded transition"
          >
            {adicionado ? 'Adicionado' : 'Adicionar ao Carrinho'}
          </button>
        </div>

    </div>
  );
}