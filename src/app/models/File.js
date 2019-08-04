import Sequelize, { Model } from 'sequelize';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

class File extends Model {
  static init(sequelize) {
    const { DOMAIN, PORT } = process.env;
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://${DOMAIN}:${PORT}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
