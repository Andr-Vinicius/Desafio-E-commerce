import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './venda.entity';
import { ItemVenda } from './item-venda.entity';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { CarrinhoModule } from '../carrinho/carrinho.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venda, ItemVenda]), CarrinhoModule],
  controllers: [VendasController],
  providers: [VendasService],
})
export class VendasModule {}
