// Contains resources for route paths beginning with '/api/songs'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');

const router = express.Router();

// ***GET ALL SONGS***
router.get('/', async (req, res) => {

});

// ***GET ALL USER'S SONGS***
router.get('/:userId', requireAuth, async (req, res) => {

});

// ***GET SONGS WITH QUERY FILTERS***
router.get('/?', async (req, res) => {

});

// ***GET DETAILS OF SONG***
router.get('/:songId', async (req, res) => {

});

// ***CREATE SONG***
router.post('/', requireAuth, async (req, res) => {

});

// ***EDIT SONG***
router.put('/:songId', requireAuth, async (req, res) => {

});

// ***DELETE SONG***
router.delete('/:songId', requireAuth, async (req, res) => {

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
