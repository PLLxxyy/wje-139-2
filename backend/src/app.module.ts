import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { HealthController } from './controllers/health.controller';
import { OwnerController } from './controllers/owner.controller';
import { ProductController } from './controllers/product.controller';
import { InboundController } from './controllers/inbound.controller';
import { OutboundController } from './controllers/outbound.controller';
import { BinLocationController } from './controllers/binLocation.controller';
import { OwnerService } from './services/owner.service';
import { ProductService } from './services/product.service';
import { InboundService } from './services/inbound.service';
import { OutboundService } from './services/outbound.service';
import { BinLocationService } from './services/binLocation.service';
import { RequestLoggerMiddleware } from './middlewares/requestLogger.middleware';
import { AuditLogMiddleware } from './middlewares/auditLog.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig)],
  controllers: [HealthController, OwnerController, ProductController, InboundController, OutboundController, BinLocationController],
  providers: [OwnerService, ProductService, InboundService, OutboundService, BinLocationService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware, AuditLogMiddleware).forRoutes('{*path}');
  }
}
