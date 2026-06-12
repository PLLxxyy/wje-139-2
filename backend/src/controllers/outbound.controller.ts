import { Body, Controller, Get, Post } from '@nestjs/common';
import { OutboundService } from '../services/outbound.service';
@Controller('outbound-orders')
export class OutboundController {
  constructor(private readonly service: OutboundService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() payload: any) { return this.service.create(payload); }
}
