'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCarrinhoStore } from '@/store/carrinho.store';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { useState } from 'react';

const schema = z.object({
  nomeCliente: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  emailCliente: z.string().email('E-mail inválido'),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { itens, total, carregar } = useCarrinhoStore();
  const router = useRouter();
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setErro('');
      await api.post('/finalizar-compra', data);
      await carregar();
      setSucesso(true);
    } catch {
      setErro('Erro ao finalizar compra. Tente novamente.');
    }
  };

  if (sucesso) {
    return (
      <main className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="text-green-400 text-6xl mb-6">✓</div>
        <h1 className="text-2xl font-semibold mb-2">Compra realizada!</h1>
        <p className="text-gray-400 mb-8">
          Você receberá um e-mail com os detalhes da sua compra.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-[#3b3dbf] hover:bg-blue-700 text-white px-6 py-3 rounded transition"
        >
          Voltar à loja
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* Formulário */}
      <div>
        <h1 className="text-2xl font-semibold mb-6">Finalizar Compra</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Nome completo</label>
            <input
              {...register('nomeCliente')}
              placeholder="João Silva"
              className="w-full bg-[#1c1f2e] border border-gray-600 text-white px-4 py-2 rounded outline-none focus:border-blue-500 transition"
            />
            {errors.nomeCliente && (
              <p className="text-red-400 text-xs mt-1">{errors.nomeCliente.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">E-mail</label>
            <input
              {...register('emailCliente')}
              placeholder="joao@email.com"
              className="w-full bg-[#1c1f2e] border border-gray-600 text-white px-4 py-2 rounded outline-none focus:border-blue-500 transition"
            />
            {errors.emailCliente && (
              <p className="text-red-400 text-xs mt-1">{errors.emailCliente.message}</p>
            )}
          </div>

          {erro && <p className="text-red-400 text-sm">{erro}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#3b3dbf] hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded transition font-medium mt-2"
          >
            {isSubmitting ? 'Processando...' : 'Confirmar Compra'}
          </button>
        </form>
      </div>

      {/* Resumo do pedido */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
        <div className="bg-[#1c1f2e] rounded-lg p-4 flex flex-col gap-3">
          {itens.map((item) => (
            <div key={item.produtoId} className="flex justify-between text-sm">
              <span className="text-gray-300">
                {item.nome} <span className="text-gray-500">x{item.quantidade}</span>
              </span>
              <span className="text-white font-medium">
                R$ {(Number(item.preco) * item.quantidade).toFixed(2).replace('.', ',')}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-700 pt-3 flex justify-between">
            <span className="text-gray-400">Total</span>
            <span className="text-blue-400 font-bold text-lg">
              R$ {Number(total).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>

    </main>
  );
}