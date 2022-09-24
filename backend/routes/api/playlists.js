// Contains resources for route paths beginning with '/api/playlists'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');

const router = express.Router();

// ***GET ALL USER'S PLAYLISTS (Feature 5)***
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const userPlaylists = await Playlist.findAll({
    where: { userId: user.id }
  });
  res.json(userPlaylists);
});

// ***CREATE PLAYLIST (Feature 5)***
router.post('/', requireAuth, async (req, res) => {
  const { user } = req;
  const { name, imageUrl } = req.body;

  const newPlaylist = await Playlist.create({
    name: name,
    previewImage: imageUrl
  });
  await user.addPlaylist(newPlaylist);

  res.json(newPlaylist);
});

// ***ADD SONG TO PLAYLIST (Feature 5)***
router.post('/:playlistId/songs', requireAuth, async (req, res) => {
  try {
    const { songId } = req.body;

    const addSong = await Song.findByPk(songId);
    const artistPlaylist = await Playlist.findByPk(req.params.playlistId);

    await artistPlaylist.addSong(addSong);

    res.json(artistPlaylist);
  } catch (err) {
    res.status(404).json({
      'message': '1Playlist couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***GET DETAILS OF PLAYLIST (Feature 5)***
router.get('/:playlistId', async (req, res) => {
  try {
    const deets = await Playlist.findOne({
      where: { id: req.params.playlistId },
      include: [{ model: Song, attributes: { exclude: ['PlaylistSong'] } }]
    });
    if (!deets) next(err);

    res.json(deets);
  } catch (err) {
    res.status(404).json({
      'message': '2Playlist couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***EDIT PLAYLIST (Feature 5)***
router.put('/:playlistId', requireAuth, async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    const editPlaylist = await Playlist.findOne({
      where: { id: req.params.playlistId }
    });
    if (!editPlaylist) next(err);

    await editPlaylist.update({
      name: name,
      previewImage: imageUrl
    });

    res.json(editPlaylist);
  } catch (err) {
    res.status(404).json({
      'message': '3Playlist couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***DELETE PLAYLIST (Feature 5)***
router.delete('/:playlistId', requireAuth, async (req, res) => {
  try {
    const deletePlaylist = await Playlist.findByPk(req.params.playlistId);

    await deletePlaylist.destroy();

    res.json({ 'message': 'Successfully deleted', 'statusCode': 200 });
  } catch (err) {
    res.status(404).json({
      'message': '4Playlist couldn\'t be found',
      'statusCode': 404
    });
  }
});

module.exports = router;
