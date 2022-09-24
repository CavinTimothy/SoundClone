// Contains resources for route paths beginning with '/api/users'
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// ***VALIDATE SIGNUP REQUEST***
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// ***SIGNUP (Feature 0)***
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  const user = await User.signup({ firstName, lastName, email, username, password });
  await setTokenCookie(res, user);
  return res.json({ user });
});

// ***GET ALL SONGS FROM ARTIST (Feature 4)***
router.get('/:artistId/songs', async (req, res) => {
  try {
    // const artistId = req.params.artistId
    const artistSongs = await Song.findAll({
      where: { userId: req.params.artistId }
    });
    if (!artistSongs.length) {
      return next(err)
    }
    // } else return res.json(artistSongs)

    return res.json({ 'Songs': artistSongs });
  } catch (err) {
    res.status(404).json({
      'message': 'Artist couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***GET DETAILS OF ARTIST (Feature 4)***
router.get('/:artistId', async (req, res) => {
  try {
    const deets = await User.findOne({
      where: { id: req.params.artistId },
    });

    const totalSongs = await Song.count({
      where: { userId: req.params.artistId }
    });
    const totalAlbums = await Album.count({
      where: { userId: req.params.artistId }
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

// ***GET ALL PLAYLISTS FROM ARTIST (Feature 5)***
router.get('/:artistId/playlists', async (req, res) => {
  try {
    const artistPlaylist = await Playlist.findAll({
      where: { userId: req.params.artistId }
    });
    if (!artistPlaylist.length) next(err);

    res.json({ 'Playlists': artistPlaylist });
  } catch (err) {
    res.status(404).json({
      'message': 'Artist couldn\'t be found',
      'statusCode': 404
    });
  }
});

module.exports = router;
