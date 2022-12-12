// Contains resources for route paths beginning with '/api/songs'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, 'bat' + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });
// const uploadImage = multer({ dest: 'images/'})
const { User, Song, Album, Playlist, Comment } = require('../../db/models');

const router = express.Router();

// ***GET ALL SONGS (Feature 1)***
// ***QUERY FILTERS (Feature 5)***
router.get('/', async (req, res) => {
  if (!req.query.page && !req.query.size) res.json(await Song.findAll());
  else {
    const { title, createdAt } = req.query;

    let query = {
      where: {},
      include: [],
    };

    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 3 : parseInt(req.query.size);

    if (page >= 1 && size >= 1) {
      query.limit = size;
      query.offset = size * (page - 1);
    }

    if (title) {
      query.where.title = { [Op.like]: `%${title}%` };
    }
    if (createdAt) {
      query.where.createdAt = { [Op.like]: `%${createdAt}%` };
    }

    const queriedSongs = await Song.findAndCountAll(query);

    res.json(queriedSongs);
  }
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
    if (!deets) next(err);

    res.json(deets);
  } catch (err) {
    res.status(404).json({
      'message': 'Song couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***CREATE SONG (Feature 1)***
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { user } = req;
    const { title, description, albumId, url, previewImage } = req.body;

    const newSong = await Song.create({
      title,
      description,
      url,
      previewImage,
    });

    if (albumId) {
      const album = await Album.findOne({ where: { id: albumId } });
      if (!album) {
        next(err);
      } else {
        await album.addSong(newSong);
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
    if (!editSong) next(err);

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
  try {
    const deleteSong = await Song.findByPk(req.params.songId);
    await deleteSong.destroy();

    res.json({ 'message': 'Successfully deleted', 'statusCode': 200 });
  } catch (err) {
    res.status(404).json({
      'message': 'Song couldn\'t be found',
      'statusCode': 404
    });
  }
});

// *****COMMENT ROUTES***** //
/////////////////////////////

// ***GET ALL SONG'S COMMENTS (Feature 3)***
router.get('/:songId/comments', async (req, res, next) => {
  try {
    const getSong = await Song.findByPk(req.params.songId);
    let allComments = await Comment.findAll({
      where: { songId: getSong.id },
      include: {
        model: User,
        attributes: {
          exclude: [
            'firstName', 'lastName', 'email',
            'hashedPassword', 'createdAt', 'updatedAt'
          ]
        }
      }
    });
    if (!allComments.length) allComments = [];

    res.json(allComments);
  } catch (err) {
    res.status(404).json({
      'message': 'Song couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***CREATE COMMENT (Feature 3)***
router.post('/:songId/comments', requireAuth, async (req, res, next) => {
  try {
    const { user } = req;
    const { body } = req.body;

    const getSong = await Song.findByPk(req.params.songId);
    const newComment = await Comment.create({ body: body });

    await getSong.addComment(newComment);
    await user.addComment(newComment);

    res.json(await Comment.findByPk(newComment.id));
  } catch (err) {
    res.status(404).json({
      'message': 'Song couldn\'t be found',
      'statusCode': 404
    });
  }
});

module.exports = router;
