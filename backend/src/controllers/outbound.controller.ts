import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OutboundService } from '../services/outbound.service';
import { InboundService } from '../services/inbound.service';

@Controller('outbound-orders')
export class OutboundController {
  constructor(
    private readonly service: OutboundService,
    private readonly inboundService: InboundService
  ) {}

  @Get() findAll() { return this.service.findAll(); }

  @Get('expiring-warnings')
  getExpiringWarnings(@Query('productIds') productIds: string, @Query('daysWithin') daysWithin: string) {
    const days = daysWithin ? parseInt(daysWithin, 10) : 30;
    const ids = productIds ? productIds.split(',').map(id => parseInt(id, 10)) : [];
    const expiring = this.inboundService.getExpiringItems(days);
    if (ids.length === 0) return expiring;
    return expiring.filter(item => ids.includes(item.productId));
  }

  @Post() create(@Body() payload: any) { return this.service.create(payload); }
}
