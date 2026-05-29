'use client';

import { useCarrinhoStore } from '@/store/carrinho.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CarrinhoPage() {
  const { itens, total, load, update } = useCarrinhoStore();
  const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  if (itens.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h1>
        <p className="text-gray-400 mb-8">Adicione produtos para continuar.</p>
        <Link
          href="/"
          className="bg-[#3b3dbf] hover:bg-blue-700 text-white px-6 py-3 rounded transition"
        >
          Ver produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-8">Meu Carrinho</h1>

      {/* Tabela de itens */}
      <div className="bg-[#1c1f2e] rounded-lg overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="bg-[#3b3dbf] text-white">
            <tr>
              <th className="text-left px-4 py-3">Produto</th>
              <th className="text-center px-4 py-3">Quantidade</th>
              <th className="text-right px-4 py-3">Subtotal</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.produtoId} className="border-t border-gray-700">
                <td className="px-4 py-4">
                  <p className="text-white font-medium">{item.nome}</p>
                  <p className="text-gray-400 text-xs">
                    R$ {Number(item.preco).toFixed(2).replace('.', ',')} cada
                  </p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => update(item.produtoId, item.quantidade - 1)}
                      className="bg-[#3b3dbf] hover:bg-blue-700 text-white w-7 h-7 rounded flex items-center justify-center transition"
                    >
                      −
                    </button>
                    <span className="text-white w-6 text-center">{item.quantidade}</span>
                    <button
                      onClick={() => update(item.produtoId, item.quantidade + 1)}
                      className="bg-[#3b3dbf] hover:bg-blue-700 text-white w-7 h-7 rounded flex items-center justify-center transition"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-blue-400 font-bold">
                  R$ {(Number(item.preco) * item.quantidade).toFixed(2).replace('.', ',')}
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => update(item.produtoId, 0)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total + botão checkout */}
      <div className="flex justify-between items-center bg-[#1c1f2e] rounded-lg px-6 py-4">
        <div>
          <p className="text-gray-400 text-sm">Total da compra</p>
          <p className="text-blue-400 font-bold text-2xl">
            R$ {Number(total).toFixed(2).replace('.', ',')}
          </p>
        </div>
        <button
          onClick={() => router.push('/checkout')}
          className="bg-[#3b3dbf] hover:bg-blue-700 text-white px-8 py-3 rounded transition font-medium"
        >
          Finalizar Compra
        </button>
      </div>
    </main>
  );
}