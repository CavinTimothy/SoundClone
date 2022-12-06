'use strict';
const bcrypt = require("bcryptjs");

const { User, Song } = require("../models");


const userSongs = {
  firstName: 'Super',
  lastName: 'Admin',
  email: 'superadmin@musician.com',
  username: 'Various Artists',
  hashedPassword: bcrypt.hashSync('password'),
  songs: [
    {
      title: 'Chicago',
      url: 'songs/Chicago.mp3',
      previewImage: 'images/Chicago.jpg',
      description: '#Pop'
    },
    {
      title: 'Dark Red',
      url: 'songs/Dark-Red.mp3',
      previewImage: 'images/Dark-Red.jpeg',
      description: '#R&B/Soul'
    },
    {
      title: 'Doomsday',
      url: 'songs/Doomsday.mp3',
      previewImage: 'images/Doomsday.jpeg',
      description: '#Hip Hop'
    },
    {
      title: 'Flashing Lights',
      url: 'songs/Flashing-Lights.mp3',
      previewImage: 'images/Flashing-Lights.jpeg',
      description: '#Hip Hop'
    },
    {
      title: 'Joker and the Thief',
      url: 'songs/Joker-n-the-Thief.mp3',
      previewImage: 'images/Joker-And-The-Thief.jpeg',
      description: '#Rock'
    },
    {
      title: 'Juice',
      url: 'songs/Juice.mp3',
      previewImage: 'images/Juice.jpeg',
      description: '#Hip Hop'
    },
    {
      title: 'Killing in the Name',
      url: 'songs/Killing-In-The-Name.mp3',
      previewImage: 'images/Killing-In-The-Name.jpeg',
      description: '#Rock'
    },
    {
      title: 'Deceptacon',
      url: 'songs/Deceptacon.mp3',
      previewImage: 'images/Le-Tigre.jpeg',
      description: '#Alternative'
    },
    {
      title: 'Mayonaka no door / Stay with me',
      url: 'songs/Stay-With-Me.mp3',
      previewImage: 'images/Mayonaka-No-Door-Stay-With-Me.jpeg',
      description: '#J-Pop'
    },
    {
      title: 'No Role Modelz',
      url: 'songs/No-Role-Modelz.mp3',
      previewImage: 'images/No-Role-Modelz.jpeg',
      description: '#Hip Hop'
    },
    {
      title: 'RENTAL',
      url: 'songs/RENTAL.mp3',
      previewImage: 'images/RENTAL.png',
      description: '#Rap'
    },
    {
      title: 'Shaolin Temple',
      url: 'songs/Shaolin-Temple.mp3',
      previewImage: 'images/Shaolin-Temple.png',
      description: '#Hip Hop'
    },
    {
      title: 'SLOW DANCING IN THE DARK',
      url: 'songs/SLOW-DANCING-IN-THE-DARK.mp3',
      previewImage: 'images/Slow-Dancing-In-The-Dark.png',
      description: '#Alternative'
    },
  ]
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { firstName, lastName, email, username, hashedPassword, songs } = userSongs;
    const artist = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      hashedPassword: hashedPassword
    });
    for (let i = 0; i < songs.length; i++) {
      const { title, url, previewImage, description } = songs[i];
      const artistSong = await Song.create({
        title,
        url,
        previewImage,
        description
      });
      await artist.addSong(artistSong);
    }
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({ where: { username: 'Various Artists' } });
  }
};
