'use strict';

const { User, Song, Album, Playlist, Comment } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: { model: 'Users' },
        onDelete: 'CASCADE'
      },
      albumId: {
        type: Sequelize.INTEGER,
        // allowNull: true,
        references: { model: 'Albums' }
      },
      title: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      previewImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};
