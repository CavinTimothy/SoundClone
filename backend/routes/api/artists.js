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

// ***GET ALL ALBUMS FROM ARTIST***
router.get('/:artistId/albums', async (req, res) => {

});

module.exports = router;
