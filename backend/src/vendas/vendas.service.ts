import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './venda.entity';
import { ItemVenda } from './item-venda.entity';
import { CarrinhoService } from '../carrinho/carrinho.service';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VendasService {
  constructor(
    // Vendas irá trabalhar com dois repositórios (Produtos x Carrinho)
    @InjectRepository(Venda)
    private vendasRepository: Repository<Venda>,
    @InjectRepository(ItemVenda)
    private itensRepository: Repository<ItemVenda>,
    private carrinhoService: CarrinhoService,
    private configService: ConfigService,
  ) {}

  async checkout(nomeCliente: string, emailCliente: string) {
    const itens = this.carrinhoService.getItens();

    if (itens.length === 0) throw new Error('Carrinho vazio');
    const totalValor = itens.reduce((total, item) => {
      return total + item.preco * item.quantidade;
    }, 0);

    // Cria a venda
    const venda = this.vendasRepository.create({
      nomeCliente,
      emailCliente,
      totalValor,
    });
    // Insere a venda no banco de dados
    await this.vendasRepository.save(venda);

    // Cria o item da venda
    for (const item of itens) {
      const itemVenda = this.itensRepository.create({
        venda,
        produto: { id: item.produtoId },
        quantidade: item.quantidade,
        precoUnitario: item.preco,
      });
      await this.itensRepository.save(itemVenda);
    }

    await this.sendEmail(nomeCliente, emailCliente, itens, totalValor);

    this.carrinhoService.cleanCart();

    return { mensagem: 'Compra finalizada com sucesso!', vendaId: venda.id };
  }

  private async sendEmail(
    nome: string,
    email: string,
    itens: any[],
    total: number,
  ) {
    // Nodemailer, uma biblioteca para enviar emails (SMTP),
    // no caso foi feito o uso do Ethereal, como um servidor falso SMTP, visando os testes
    const transporter = nodemailer.createTransport({
      // Cria o transportador usando as configurações do .env (Ethereal)
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });

    // Conteúdo HTML do email
    const itensHtml = itens
      .map(
        (item) => `
      <tr>
        <td>${item.nome}</td>
        <td>${item.quantidade}</td>
        <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
      </tr>
    `).join('');

    await transporter.sendMail({
      from: '"Ecommerce Teste" <loja@example.com>',
      to: email,
      subject: 'Confirmação de Compra',
      html: `
        <h2>Olá, ${nome}!</h2>
        <p>Sua compra foi confirmada. Veja o resumo abaixo:</p>
        <table>
          <tr><th>Produto</th><th>Quantidade</th><th>Subtotal</th></tr>
          ${itensHtml}
        </table>
        <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
        <p>Obrigado pela sua compra!</p>
      `,
    });
  }
}
