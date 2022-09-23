// Contains resources for route paths beginning with '/api/artists'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');

const router = express.Router();

// ***GET DETAILS OF ARTIST***
router.get('/:artistId', async (req, res) => {

});

// ***GET ALL PLAYLISTS FROM ARTIST***
router.get('/:artistId/playlists', async (req, res) => {

});

// ***GET ALL ALBUMS FROM ARTIST (Feature 2)***
router.get('/:artistId/albums', async (req, res) => {
  try {
    // const { artistId } = req.params.artistId;
    const artistAlbums = await Album.findAll({
      where: { userId: req.params.artistId }
    });
    // if (!artistAlbums) next(err);

    res.json({ 'Albums': artistAlbums });
  } catch (err) {
    res.status(404).json({
      'message': 'Artist couldn\'t be found',
      'statusCode': 404
    });
  }
});

module.exports = router;
