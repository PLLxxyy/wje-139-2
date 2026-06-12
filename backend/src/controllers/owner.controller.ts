import { Body, Controller, Get, Post } from '@nestjs/common';
import { OwnerService } from '../services/owner.service';
@Controller('owners')
export class OwnerController {
  constructor(private readonly service: OwnerService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() payload: any) { return this.service.create(payload); }
}
