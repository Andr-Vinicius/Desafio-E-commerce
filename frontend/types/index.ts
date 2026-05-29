export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
  }
  
  export interface ItemCarrinho {
    produtoId: number;
    nome: string;
    preco: number;
    quantidade: number;
  }
  
  export interface Carrinho {
    itens: ItemCarrinho[];
    total: number;
  }