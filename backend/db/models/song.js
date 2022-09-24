'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Song.belongsTo(models.Album, {
        foreignKey: 'albumId'
      });
      Song.belongsToMany(models.Playlist, {
        through: models.PlaylistSong,
        foreignKey: 'songId'
      });
      Song.hasMany(models.Comment, {
        foreignKey: 'songId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      // allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    url: {
      type: DataTypes.STRING
    },
    previewImage: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Song',
    // defaultScope: {
    //   attributes: {
    //     exclude: ['createdAt', 'updatedAt']
    //   }
    // }
  });
  return Song;
};
