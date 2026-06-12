import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() payload: any) { return this.service.create(payload); }
}
