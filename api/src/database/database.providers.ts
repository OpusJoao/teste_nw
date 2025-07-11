import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const DATA_SOURCE = 'DATA_SOURCE';
export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dados: DataSourceOptions = {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'root123',
        database: process.env.DB_NAME || 'todo',
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        migrations: [__dirname + '/../migrations/*.{js,ts}'],
        migrationsRun: false,
        synchronize: false,
      };
      const dataSourceConn = addTransactionalDataSource(new DataSource(dados));
      return await dataSourceConn.initialize();
    },
  },
];
