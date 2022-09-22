// Contains resources for route paths beginning with '/api/songs'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');

const router = express.Router();

// ***GET ALL SONGS (Feature 1)***
router.get('/', async (req, res) => {
  const allSongs = await Song.findAll();
  res.json(allSongs);
});

// ***GET ALL USER'S SONGS (Feature 1)***
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const userSongs = await Song.findAll({
    where: {
      userId: user.id
    }
  });
  res.json(userSongs);
});

// ***GET DETAILS OF SONG (Feature 1)***
router.get('/:songId', async (req, res) => {
  try {
    const deets = await Song.findOne({
      where: {
        id: req.params.songId
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'firstName', 'lastName', 'email',
              'hashedPassword', 'createdAt', 'updatedAt'
            ]
          }
        },
        {
          model: Album,
          attributes: {
            exclude: ['userId', 'description', 'createdAt', 'updatedAt']
          }
        }
      ]
    });

    return res.json(deets);
  } catch (err) {
    res.status(404).res.json({
      'message': 'Song couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***CREATE SONG (Feature 1)***
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { user } = req;
    const { title, description, url, imageUrl, albumId } = req.body;

    const newSong = await Song.create({
      title: title,
      description: description,
      url: url,
      previewImage: imageUrl
    });

    if (albumId) {
      const album = await Album.findOne({ where: { id: albumId } });
      if (!album) {
        next(err)
      }
    }
    await user.addSong(newSong);

    res.json(await Song.findByPk(newSong.id));
  } catch (err) {
    res.status(404).json({
      'message': 'Album couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***EDIT SONG (Feature 1)***
router.put('/:songId', requireAuth, async (req, res) => {
  try {
    const { title, description, url, imageUrl } = req.body;

    const editSong = await Song.findOne({
      where: { id: req.params.songId }
    });

    await editSong.update({
      title: title,
      description: description,
      url: url,
      previewImage: imageUrl
    });

    res.json(editSong);
  } catch (err) {
    res.status(404).json({
      'message': 'Song couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***DELETE SONG (Feature 1)***
router.delete('/:songId', requireAuth, async (req, res) => {
  const { user } = req;

  try {
    const deleteSong = await Song.findByPk(req.params.songId);

    await deleteSong.destroy();

    res.json({ 'message': 'Successfully deleted', 'statusCode': 200 });
  } catch (err) {
    res.status(404).json({
      'message': 'Song coudn\'t be found',
      'statusCode': 404
    });
  }
});

// ***GET SONGS WITH QUERY FILTERS (Feature 5)***
router.get('/?', async (req, res) => {

});

// *****COMMENT ROUTES***** //
/////////////////////////////

// ***GET ALL SONG'S COMMENTS***
router.get('/:songId/comments', async (req, res) => {

});

// ***CREATE COMMENT***
router.post('/:songId/comments', requireAuth, async (req, res) => {

});

// ***EDIT COMMENT***
router.put('/:songId/comments/:commentId', requireAuth, async (req, res) => {

});

// ***DELETE COMMENT***
router.delete('/:songId/comments/:commentId', requireAuth, async (req, res) => {

});

module.exports = router;
