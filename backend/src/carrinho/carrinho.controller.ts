import { Controller, Post, Put, Get, Body } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { ItemCarrinho } from './carrinho.types';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  @Get()
  listar(): { itens: ItemCarrinho[]; total: number } {
    return this.carrinhoService.list();
  }

  @Post()
  adicionar(
    @Body()
    body: {
      produtoId: number;
      nome: string;
      preco: number;
      quantidade: number;
    },
  ): { itens: ItemCarrinho[]; total: number } {
    return this.carrinhoService.insert(
      body.produtoId,
      body.nome,
      body.preco,
      body.quantidade,
    );
  }

  @Put()
  update(@Body() body: { produtoId: number; quantidade: number }): {
    itens: ItemCarrinho[];
    total: number;
  } {
    return this.carrinhoService.update(body.produtoId, body.quantidade);
  }
}
