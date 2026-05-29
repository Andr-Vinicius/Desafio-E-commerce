import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ItemVenda } from './item-venda.entity';

@Entity('vendas')
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emailCliente: string;

  @Column()
  nomeCliente: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalValor: number;

  @CreateDateColumn()
  criadoEm: Date;

  @OneToMany(() => ItemVenda, (item) => item.venda, { cascade: true })
  itens: ItemVenda[];
}
