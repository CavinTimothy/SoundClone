'use strict';

const { User, Song, Comment } = require("../models");

const userComments = [
  {
    username: 'Cav-man',
    songs: [
      {
        title: 'Bad Habit',
        comment: 'GET THIS SONG OUTTA MY HEAD'
      },
      {
        title: 'Humility',
        comment: 'Groovy stuff, 10/10 would marry this song'
      }
    ]
  },
  {
    username: 'Z-Breezy',
    songs: [
      {
        title: 'Bad Habit',
        comment: 'Can\'t relate, I\'m just THAT GUY i guess'
      },
      {
        title: 'Humility',
        comment: 'They won\'t admit it, but I wrote this whole album'
      }
    ]
  },
  {
    username: 'RodthanyAnriguez',
    songs: [
      {
        title: 'Bad Habit',
        comment: 'This Steve guy gets me man'
      },
      {
        title: 'Humility',
        comment: 'I am in disbelief. I thought cartoons dudes were making this sweet sound. Nah it\'s just a bunch of regular dudes >:('
      }
    ]
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < userComments.length; i++) {
      const { username, songs } = userComments[i];
      const user = await User.findOne({
        where: { username: username }
      });
      for (let j = 0; j < songs.length; j++) {
        const { title, comment } = songs[j];
        const artistSong = await Song.findOne({
          where: { title: title }
        });
        const newComment = await Comment.create({ body: comment });
        await user.addComment(newComment);
        await artistSong.addComment(newComment);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    for (let i = 0; i < userComments.length; i++) {
      const { songs } = userComments[i];
      for (let j = 0; j < songs.length; j++) {
        const { comment } = songs[j];
        await Comment.destroy({ where: { body: comment } });
      }
    }
  }
};
