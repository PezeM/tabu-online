import config from 'config';

const connectionString: string = config.get('db.connectionString');

export const databaseConnection = {
  url: connectionString,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
};
