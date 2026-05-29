import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedProdutos } from './produtos/produtos.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Inicialização

  app.enableCors(); // Permite as requisições de origem "duvidosa" no Front-end

  const dataSource = app.get(DataSource); // Instância da Conexão com o banco
  await seedProdutos(dataSource); // Cria dados iniciais para a tabela de produtos

  await app.listen(3001);
  console.log('Backend rodando em http://localhost:3001');
}
void bootstrap();
