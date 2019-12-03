import { createConnection, EntitySchema } from 'typeorm';
import { loadConfig } from '../configs';

const loadMysqlConfig = () => ({
  host: loadConfig('MYSQL_HOST'),
  port: loadConfig('MYSQL_PORT'),
  username: loadConfig('MYSQL_USER'),
  password: loadConfig('MYSQL_PASSWORD'),
  database: loadConfig('MYSQL_DATABASE'),
  extra: {
    connectionLimit: loadConfig('MYSQL_CONNECTION_LIMIT', {
      mandantory: false,
      defaultValue: 10,
    }),
  },
  timezone: '+00:00',
});

interface TypeOrmOptions {
  logging?: boolean;
  synchronize?: boolean;
  entities: EntitySchema[];
}

const defaultTypeOrmOption = () => ({
  logging: true,
  synchronize: false,
  entities: [],
});

export const initTypeORM =
  async (opts?: TypeOrmOptions) => {
    const cfg = loadMysqlConfig();

    const mergedOptions = {
      ...defaultTypeOrmOption(),
      ...opts ? opts : {},
    };

    await createConnection({
      entityPrefix: 'fcw_',
      name: 'default',
      type: 'mysql',
      ...mergedOptions,
      ...cfg,
    });
  };
