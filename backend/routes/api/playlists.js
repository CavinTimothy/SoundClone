// Contains resources for route paths beginning with '/api/playlists'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');

const router = express.Router();

// ***CREATE PLAYLIST***
router.post('/', requireAuth, async (req, res) => {

});

// ***ADD SONG TO PLAYLIST***
router.post('/:playlistId/:songId', requireAuth, async (req, res) => {

});

// ***GET DETAILS OF PLAYLIST***
router.get('/:playlistId', async (req, res) => {

});

// ***EDIT PLAYLIST***
router.put('/:playlistId', requireAuth, async (req, res) => {

});

// ***DELETE PLAYLIST***
router.delete('/:playlistId', requireAuth, async (req, res) => {

});

// ***GET ALL USER'S PLAYLISTS***
router.get('/:userId', requireAuth, async (req, res) => {

});

module.exports = router;
