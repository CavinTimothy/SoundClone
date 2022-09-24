'use strict';

const { User, Song, Playlist, PlaylistSong } = require("../models");

const playSongs = [
  {
    title: 'Cav\'s Favs',
    username: 'Cav-man',
    songs: [
      { id: 1 }, { id: 5 }, { id: 6 }
    ]
  },
  {
    title: 'Zav\'s Favs',
    username: 'Z-Breezy',
    songs: [
      { id: 2 }, { id: 5 }, { id: 7 }
    ]
  },
  {
    title: 'Roddy Raves',
    username: 'RodthanyAnriguez',
    songs: [
      { id: 3 }, { id: 5 }, { id: 8 }
    ]
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < playSongs.length; i++) {
      const { title, username, songs } = playSongs[i];
      const users = await User.findOne({
        where: { username: username }
      });
      const newPlaylist = await Playlist.create({ name: title });
      await users.addPlaylist(newPlaylist);
      for (let j = 0; j < songs.length; j++) {
        const { id } = songs[j];
        const addSongs = await Song.findByPk(id);
        await newPlaylist.addSong(addSongs);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    for (let i = 0; i < playSongs.length; i++) {
      const { title } = playSongs[i];
      await Playlist.destroy({ where: { name: title } });
    }
  }
};
