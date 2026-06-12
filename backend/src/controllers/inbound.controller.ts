import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InboundService } from '../services/inbound.service';

@Controller('inbound-orders')
export class InboundController {
  constructor(private readonly service: InboundService) {}

  @Get() findAll() { return this.service.findAll(); }

  @Get('expiring-items')
  getExpiringItems(@Query('daysWithin') daysWithin: string) {
    const days = daysWithin ? parseInt(daysWithin, 10) : 30;
    return this.service.getExpiringItems(days);
  }

  @Post() create(@Body() payload: any) { return this.service.create(payload); }
}
