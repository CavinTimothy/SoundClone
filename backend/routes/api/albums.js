// Contains resources for route paths beginning with '/api/albums'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');

const router = express.Router();

// ***GET ALL ALBUMS (Feature 2)***
router.get('/', async (req, res) => {
  const allAlbums = await Album.findAll();
  res.json(allAlbums);
});

// ***GET ALL USER'S ALBUMS (Feature 2)***
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const userAlbums = await Album.findAll({
    where: { userId: user.id }
  });
  res.json(userAlbums);
});

// ***GET DETAILS OF ALBUM (Feature 2)***
router.get('/:albumId', async (req, res) => {
  try {
    const deets = await Album.findOne({
      where: { id: req.params.albumId },
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
          model: Song
        }
      ]
    });
    if (!deets) next(err);

    return res.json(deets);
  } catch (err) {
    res.status(404).json({
      'message': 'Album couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***CREATE ALBUM (Feature 2)***
router.post('/', requireAuth, async (req, res) => {
  const { user } = req;
  const { title, description, imageUrl } = req.body;

  const newAlbum = await Album.create({
    title: title,
    description: description,
    previewImage: imageUrl
  });
  await user.addAlbum(newAlbum);

  res.json(await Album.findByPk(newAlbum.id));
});

// ***EDIT ALBUM (Feature 2)***
router.put('/:albumId', requireAuth, async (req, res) => {
  try {
    const { user } = req;
    const { title, description, imageUrl } = req.body;

    const editAlbum = await Album.findOne({
      where: { id: req.params.albumId }
    });
    if (!editAlbum) next(err);

    await editAlbum.update({
      title: title,
      description: description,
      previewImage: imageUrl
    });

    res.json(editAlbum);
  } catch (err) {
    res.status(404).json({
      'message': 'Album couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***DELETE ALBUM (Feature 2)***
router.delete('/:albumId', requireAuth, async (req, res) => {
  try {
    const deleteAlbum = await Album.findByPk(req.params.albumId);

    await deleteAlbum.destroy();

    res.json({ 'message': 'Successfully deleted', 'statusCode': 200 });
  } catch (err) {
    res.status(404).json({
      'message': 'Album coudn\'t be found',
      'statusCode': 404
    });
  }
});

module.exports = router;
