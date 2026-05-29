import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Venda } from './venda.entity';
import { Produto } from '../produtos/produto.entity';

@Entity('itens_venda')
export class ItemVenda {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venda, (venda) => venda.itens)
  venda: Venda;

  @ManyToOne(() => Produto)
  produto: Produto;

  @Column()
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precoUnitario: number;
}
