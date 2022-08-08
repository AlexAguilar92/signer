import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// import entities from '@ix/model-manager';
import entities from '@ix/model-manager';
//import tax from '@ix/model-manager';
export default class DBConnectionHelper {
  async connect(url: string): Promise<DataSource> {
    console.log('entities', entities);

    console.log('🚀 ~ file: DBConnectionHelper.ts ~ line 10 ~ DBConnectionHelper ~ connect ~ url', url);
    const dataSourceOptions: PostgresConnectionOptions = {
      url,
      type: 'postgres',
      port: 5432,
      namingStrategy: new SnakeNamingStrategy(),
      entities,
      logging: true,
    };
    return await new DataSource(dataSourceOptions).initialize();
  }
}
