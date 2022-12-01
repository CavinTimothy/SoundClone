'use strict';

const bcrypt = require("bcryptjs");

let options = {
  tableName: 'Users',
};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Cavin',
        lastName: 'Timothy',
        email: 'cavint@user.io',
        username: 'Cav-man',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Zaviar',
        lastName: 'Brown',
        email: 'brownz@user.io',
        username: 'Z-Breezy',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Anthony',
        lastName: 'Rodriguez',
        email: 'rodriguez@user.io',
        username: 'RodthanyAnriguez',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Cav-man', 'Z-Breezy', 'RodthanyAnriguez'] }
    }, {});
  }
};
