'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Produto } from '@/types';
import api from '@/services/api';
import { ProdutoCard } from '@/components/ProdutoCard';

export default function Home() {
  const [busca, setBusca] = useState('');
  const [ordenar, setOrdenar] = useState('padrao');

  const { data: produtos = [], isLoading } = useQuery<Produto[]>({
    queryKey: ['produtos'],
    queryFn: async () => {
      const { data } = await api.get('/produtos');
      return data;
    },
  });

  const produtosFiltrados = produtos
    .filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => {
      if (ordenar === 'menor') return a.preco - b.preco;
      if (ordenar === 'maior') return b.preco - a.preco;
      return 0;
    });

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Explore nossos produtos
      </h1>

      {/* Busca */}
      <div className="flex justify-center mb-6">
        <div className="flex w-full max-w-xl bg-[#1c1f2e] rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-400 outline-none"
          />
          <button className="bg-[#3b3dbf] px-6 py-2 text-white hover:bg-blue-700 transition">
            Buscar
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Ordenar por:</span>
          <select
            value={ordenar}
            onChange={(e) => setOrdenar(e.target.value)}
            className="bg-[#1c1f2e] text-white text-sm px-3 py-1 rounded border border-gray-600 outline-none"
          >
            <option value="padrao">Padrão</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>
      </div>

      {/* Grid de produtos */}
      {isLoading ? (
        <p className="text-center text-gray-400">Carregando produtos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </main>
  );
}