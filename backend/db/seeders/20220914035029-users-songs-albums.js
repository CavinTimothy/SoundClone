'use strict';

const bcrypt = require("bcryptjs");

const { User, Album, Song } = require("../models");

const userSongs = [
  {
    firstName: 'Steve',
    lastName: 'Lacy',
    email: 'stevelacy@musician.com',
    username: 'SteveLacy',
    hashedPassword: bcrypt.hashSync('thatstevelacy'),
    albums: [
      {
        albumTitle: 'Gemini Rights',
        description: 'R&B/Soul',
        image: 'true',
        songs: [
          {
            title: 'Static',
            url: 'true',
            previewImage: 'true',
          },
          {
            title: 'Helmet',
            url: 'true',
            previewImage: 'true',
          },
          {
            title: 'Mercury',
            url: 'true',
            previewImage: 'true',
          },
          {
            title: 'Buttons',
            url: 'true',
            previewImage: 'true',
          },
          {
            title: 'Bad Habit',
            url: 'true',
            previewImage: 'true',
          }
        ]
      }
    ],
  },
  {
    firstName: 'Damon',
    lastName: 'Albarn',
    email: 'gorillaz@musician.com',
    username: 'Gorillaz',
    hashedPassword: bcrypt.hashSync('songmachines'),
    albums: [
      {
        albumTitle: 'The Now Now',
        description: 'Alternative',
        image: 'true',
        songs: [
          {
            title: 'Humility',
            url: 'true',
            previewImage: 'true'
          },
          {
            title: 'Tranz',
            url: 'true',
            previewImage: 'true'
          },
          {
            title: 'Hollywood',
            url: 'true',
            previewImage: 'true'
          },
          {
            title: 'Kansas',
            url: 'true',
            previewImage: 'true'
          },
          {
            title: 'Sorcererz',
            url: 'true',
            previewImage: 'true'
          }
        ]
      }
    ],
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < userSongs.length; i++) {
      const { firstName, lastName, email, username, hashedPassword, albums } = userSongs[i];
      const artist = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        hashedPassword: hashedPassword
      });
      for (let j = 0; j < albums.length; j++) {
        const { albumTitle, description, image, songs } = albums[j];
        const artistAlbum = await Album.create({
          title: albumTitle,
          description: description,
          previewImage: image
        });
        await artist.addAlbum(artistAlbum);
        for (let k = 0; k < songs.length; k++) {
          const { title, url, previewImage } = songs[k];
          const artistSong = await Song.create({
            title: title,
            url: url,
            previewImage: previewImage
          });
          await artist.addSong(artistSong);
          await artistAlbum.addSong(artistSong);
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['SteveLacy', 'Gorillaz'] }
    }, {});
  }
};
