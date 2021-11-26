process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import { App } from '@/app';
import validateEnv from '@utils/validate-env';
import { IndexController, LobbyController } from '@/controllers';

validateEnv();

export const app = new App([IndexController, LobbyController]);
app.listen();
