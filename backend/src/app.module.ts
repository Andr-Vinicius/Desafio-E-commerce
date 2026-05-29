import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosModule } from './produtos/produtos.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { VendasModule } from './vendas/vendas.module';

// Modulo raiz
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Configuração da conexão com o Banco de Dados, ocorre de maneira assincrona para esperar o .env ser carregado
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        ssl: { rejectUnauthorized: false },
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    // Registro dos módulos da aplicação
    ProdutosModule,
    CarrinhoModule,
    VendasModule,
  ],
})
export class AppModule {}
