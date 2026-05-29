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
      descricao: 'Calça jeans slim fit, confortável e durável',
      preco: 129.9,
      estoque: 50,
    },
    {
      nome: 'Tênis Casual',
      descricao: 'Tênis leve e confortável para o dia a dia',
      preco: 199.9,
      estoque: 30,
    },
    {
      nome: 'Boné Aba Reta',
      descricao: 'Boné com ajuste traseiro, tecido resistente',
      preco: 39.9,
      estoque: 80,
    },
    {
      nome: 'Mochila Urbana',
      descricao: 'Mochila com compartimento para notebook',
      preco: 159.9,
      estoque: 25,
    },
  ]);

  console.log('Produtos inseridos com sucesso!');
}
