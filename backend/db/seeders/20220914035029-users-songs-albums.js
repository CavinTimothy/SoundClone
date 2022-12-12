'use strict';

const bcrypt = require("bcryptjs");

const { User, Album, Song } = require("../models");

const userSongs = [
  {
    firstName: 'Steve',
    lastName: 'Lacy',
    email: 'stevelacy@musician.com',
    username: 'Steve Lacy',
    hashedPassword: bcrypt.hashSync('thatstevelacy'),
    albums: [
      {
        albumTitle: 'Gemini Rights',
        description: '#R&B/Soul',
        image: null,
        songs: [
          {
            title: 'Helmet',
            url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Helmet.mp3',
            previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Helmet.jpeg',
            description: '#R&B/Soul'
          },
          {
            title: 'Bad Habit',
            url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Bad-Habit.mp3',
            previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Bad-Habits.jpeg',
            description: '#R&B/Soul'
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
        description: '#Alternative',
        image: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/The-Now-Now.jpeg',
        songs: [
          {
            title: 'Humility',
            url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Humility.mp3',
            previewImage: null,
            description: '#Alternative'
          },
          {
            title: 'Tranz',
            url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Tranz.mp3',
            previewImage: null,
            description: '#Alternative'
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
          const { title, url, previewImage, description } = songs[k];
          let songImage
          !previewImage ? songImage = artistAlbum.previewImage : songImage = previewImage;
          const artistSong = await Song.create({
            title: title,
            url: url,
            previewImage: songImage,
            description: description
          });
          await artist.addSong(artistSong);
          await artistAlbum.addSong(artistSong);
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete('Users', {
    //   username: { [Op.in]: ['SteveLacy', 'Gorillaz'] }
    // }, {});
    for (let i = 0; i < userSongs.length; i++) {
      const { username } = userSongs[i];
      await User.destroy({ where: { username: username } });

    }
  }
};
