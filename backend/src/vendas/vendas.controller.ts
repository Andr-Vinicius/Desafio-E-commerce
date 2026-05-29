import { Controller, Post, Body } from '@nestjs/common';
import { VendasService } from './vendas.service';

@Controller('finalizar-compra')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  checkout(@Body() body: { nomeCliente: string; emailCliente: string }) {
    return this.vendasService.checkout(body.nomeCliente, body.emailCliente);
  }
}
