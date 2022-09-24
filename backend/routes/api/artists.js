// Contains resources for route paths beginning with '/api/artists'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment, sequelize } = require('../../db/models');

const router = express.Router();

// ***GET DETAILS OF ARTIST (Feature 4)***
router.get('/:artistId', async (req, res) => {
  try {
    const totalSongs = await Song.count({
      where: { userId: req.params.artistId }
    });
    // res.json({ 'message': 'this works', 'totalSongs': totalSongs });

    const totalAlbums = await Album.count({
      where: { userId: req.params.artistId }
    });
    // res.json({ 'message': 'this works', 'totalAlbums': totalAlbums });

    // const totalAlbums = await artistAlbums.count();
    const deets = await User.findOne({
      where: { id: req.params.artistId },
      // attributes:
      // {
      //   exclude: ['firstName', 'lastName', 'email'],
      //   include: [
      //     [
      //       sequelize.literal(`(
      //         SELECT COUNT(*)
      //         FROM songs
      //         WHERE song.userId = user.id
      //       )`), 'totalSongs'
      //     ],
      //     [
      //       sequelize.literal(`(
      //         SELECT COUNT(*)
      //         FROM albums
      //         WHERE album.userId = user.id
      //       )`), 'totalAlbums'
      //     ],
      //   ]
      // }
    });

    res.json({
      'id': deets.id,
      'username': deets.username,
      'previewImage': deets.previewImage,
      'totalSongs': totalSongs,
      'totalAlbums': totalAlbums
    });
  } catch (err) {
    res.status(404).json({
      'message': 'Artist couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***GET ALL PLAYLISTS FROM ARTIST***
router.get('/:artistId/playlists', async (req, res) => {

});

// ***GET ALL ALBUMS FROM ARTIST (Feature 4)***
router.get('/:artistId/albums', async (req, res) => {
  try {
    const artistAlbums = await Album.findAll({
      where: { userId: req.params.artistId }
    });
    if (!artistAlbums.length) next(err);

    res.json({ 'Albums': artistAlbums });
  } catch (err) {
    res.status(404).json({
      'message': 'Artist couldn\'t be found',
      'statusCode': 404
    });
  }
});

module.exports = router;
