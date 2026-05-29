import { DataSource } from 'typeorm';
import { Produto } from './produto.entity';

export async function seedProdutos(dataSource: DataSource) {
  const repo = dataSource.getRepository(Produto);

  const count = await repo.count();
  if (count > 0) return;

  await repo.save([
    {
      nome: 'Camiseta Básica',
      preco: 49.9,
      estoque: 100,
    },
    {
      nome: 'Calça Jeans',
      preco: 129.9,
      estoque: 50,
    },
    {
      nome: 'Tênis Casual',
      preco: 199.9,
      estoque: 30,
    },
    {
      nome: 'Boné Aba Reta',
      preco: 39.9,
      estoque: 80,
    },
    {
      nome: 'Mochila',
      preco: 159.9,
      estoque: 25,
    },
  ]);

  console.log('Produtos inseridos com sucesso!');
}
