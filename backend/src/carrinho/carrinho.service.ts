import { Injectable, NotFoundException } from '@nestjs/common';

interface ItemCarrinho {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
}

@Injectable()
export class CarrinhoService {
  private carrinho: Map<number, ItemCarrinho> = new Map();

  insert(produtoId: number, nome: string, preco: number, quantidade: number) {
    if (this.carrinho.has(produtoId)) {
      const item = this.carrinho.get(produtoId);
      item!.quantidade += quantidade;
    } else {
      this.carrinho.set(produtoId, { produtoId, nome, preco, quantidade });
    }
    return this.list();
  }

  update(produtoId: number, quantidade: number) {
    if (!this.carrinho.has(produtoId)) {
      throw new NotFoundException('Produto não encontrado...');
    }

    if (quantidade <= 0) {
      this.carrinho.delete(produtoId);
    } else {
      this.carrinho.get(produtoId)!.quantidade = quantidade;
    }

    return this.list();
  }

  list() {
    const itens = Array.from(this.carrinho.values());
    const total = itens.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0,
    );
    return { itens, total };
  }

  cleanCart() {
    this.carrinho.clear();
  }

  getItens() {
    return Array.from(this.carrinho.values());
  }
}
