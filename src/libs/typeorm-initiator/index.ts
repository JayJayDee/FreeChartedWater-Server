import { createConnection } from 'typeorm';
import { loadConfig } from '../configs';
import { log } from '../logger';

const tag = '[typeorm-initiator]';

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
  entities: any[];
}

const defaultTypeOrmOption = () => ({
  logging: true,
  synchronize: false,
  entities: [],
});

export const initTypeORM =
  async (opts?: TypeOrmOptions) => {
    log.info(`${tag} initializing TypeORM...`);
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

    log.info(`${tag} TypeORM initialized.`);
  };
