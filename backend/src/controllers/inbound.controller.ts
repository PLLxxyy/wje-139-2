import { Body, Controller, Get, Post } from '@nestjs/common';
import { InboundService } from '../services/inbound.service';
@Controller('inbound-orders')
export class InboundController {
  constructor(private readonly service: InboundService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() payload: any) { return this.service.create(payload); }
}
