import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

// Permite que a classe seja injetada como dependência em outros lugares, como no Controller
@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtosRepository: Repository<Produto>,
  ) {}

  // Retorna todos os produtos
  findAll(): Promise<Produto[]> {
    return this.produtosRepository.find();
  }
}
