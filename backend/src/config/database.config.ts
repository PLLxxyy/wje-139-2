export const databaseConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'supply_user',
  password: process.env.DB_PASSWORD || 'supply_password',
  database: process.env.DB_NAME || 'supply_warehouse',
  autoLoadEntities: true,
  synchronize: true
};
