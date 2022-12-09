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
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Chicago.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Chicago.jpg',
      description: '#Pop'
    },
    {
      title: 'Dark Red',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Dark-Red.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Dark-Red.jpeg',
      description: '#R&B/Soul'
    },
    {
      title: 'Doomsday',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Doomsday.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Doomsday.jpeg',
      description: '#Hip Hop'
    },
    {
      title: 'Flashing Lights',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Flashing-Lights.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Flashing-Lights.jpeg',
      description: '#Hip Hop'
    },
    {
      title: 'Joker and the Thief',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Joker-n-the-Thief.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Joker-And-The-Thief.jpeg',
      description: '#Rock'
    },
    {
      title: 'Juice',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Juice.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Juice.jpeg',
      description: '#Hip Hop'
    },
    {
      title: 'Killing in the Name',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Killing-In-The-Name.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Killing-In-The-Name.jpeg',
      description: '#Rock'
    },
    {
      title: 'Deceptacon',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Deceptacon.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Le-Tigre.jpeg',
      description: '#Alternative'
    },
    {
      title: 'Mayonaka no door / Stay with me',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Stay-With-Me.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Mayonaka-No-Door-Stay-With-Me.jpeg',
      description: '#J-Pop'
    },
    {
      title: 'No Role Modelz',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/No-Role-Modelz.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/No-Role-Modelz.jpeg',
      description: '#Hip Hop'
    },
    {
      title: 'RENTAL',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/RENTAL.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/RENTAL.png',
      description: '#Rap'
    },
    {
      title: 'Shaolin Temple',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Shaolin-Temple.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Shaolin-Temple.png',
      description: '#Hip Hop'
    },
    {
      title: 'SLOW DANCING IN THE DARK',
      url: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/SLOW-DANCING-IN-THE-DARK.mp3',
      previewImage: 'https://soundcloneupload.s3.us-west-2.amazonaws.com/Slow-Dancing-In-The-Dark.png',
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
