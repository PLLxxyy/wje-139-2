# 供应链仓储出入库协同管理系统

## Docker 快速启动

```bash
docker compose up -d
```

前端：http://localhost:18709  
后端：http://localhost:19209/api/health

## 项目介绍

面向供应链中转仓的多货主、多批次出入库协同系统，覆盖收货质检、上架、拣货、复核、发货与货主管理。

## 本地开发

```bash
cd backend && npm install && npm run start:dev
cd frontend && npm install && npm run dev
```

## 技术栈

| 层 | 技术 |
| --- | --- |
| 前端 | Vue 3 + TypeScript + Vite |
| UI | Element Plus |
| 状态 | Pinia |
| 图表 | ECharts |
| 后端 | NestJS + TypeScript |
| ORM | TypeORM |
| 数据库 | PostgreSQL 15 |

## 目录结构

```
frontend/src/
├── api/ stores/ types/ components/common/ hooks/ pages/ router/ utils/ constants/
backend/src/
├── routes/ controllers/ services/ models/ middlewares/ types/ utils/ config/ database/
```

## 枚举位置

- InboundStatus：frontend/src/types/enums.ts；frontend/src/types/inbound.ts；frontend/src/pages/InboundManage.vue；backend/src/types/enums.ts；backend/src/services/inbound.service.ts
- OutboundStatus：frontend/src/types/enums.ts；frontend/src/types/outbound.ts；frontend/src/pages/OutboundManage.vue；backend/src/types/enums.ts；backend/src/services/outbound.service.ts
- StorageRequirement：frontend/src/types/enums.ts；frontend/src/types/product.ts；frontend/src/types/binLocation.ts；backend/src/types/enums.ts；backend/src/models/product.entity.ts
- QCResult：frontend/src/types/enums.ts；frontend/src/types/inbound.ts；backend/src/types/enums.ts；backend/src/models/inboundItem.entity.ts

## License

MIT
