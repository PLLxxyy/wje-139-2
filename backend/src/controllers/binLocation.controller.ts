import { Body, Controller, Get, Post } from '@nestjs/common';
import { BinLocationService } from '../services/binLocation.service';
@Controller('bin-locations')
export class BinLocationController {
  constructor(private readonly service: BinLocationService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() payload: any) { return this.service.create(payload); }
}
