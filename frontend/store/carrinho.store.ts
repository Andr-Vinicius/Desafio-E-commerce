import { create } from 'zustand';
import { ItemCarrinho } from '@/types';
import api from '@/services/api';

// Funcionamento do Zustand é semelhante ao Pinia do Vue, usado para o gerenciamento do estado
interface CarrinhoStore {
  itens: ItemCarrinho[];
  total: number;
  insert: (produto: { produtoId: number; nome: string; preco: number; quantidade: number }) => Promise<void>;
  update: (produtoId: number, quantidade: number) => Promise<void>;
  load: () => Promise<void>;
}

export const useCarrinhoStore = create<CarrinhoStore>((set) => ({
  itens: [],
  total: 0,

  load: async () => {
    const { data } = await api.get('/carrinho');
    set({ itens: data.itens, total: data.total });
  },

  insert: async (produto) => {
    const { data } = await api.post('/carrinho', produto);
    set({ itens: data.itens, total: data.total });
  },

  update: async (produtoId, quantidade) => {
    const { data } = await api.put('/carrinho', { produtoId, quantidade });
    set({ itens: data.itens, total: data.total });
  },
}));