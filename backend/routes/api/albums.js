// Contains resources for route paths beginning with '/api/albums'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');

const router = express.Router();

// ***GET ALL ALBUMS***
router.get('/', async (req, res) => {

});

// ***GET ALL USER'S ALBUMS***
router.get('/userId', requireAuth, async (req, res) => {

});

// ***GET DETAILS OF ALBUM***
router.get('/:albumId', async (req, res) => {

});

// ***CREATE ALBUM***
router.post('/', requireAuth, async (req, res) => {

});

// ***EDIT ALBUM***
router.put('/:albumId', requireAuth, async (req, res) => {

});

// ***DELETE ALBUM***
router.delete('/:albumId', requireAuth, async (req, res) => {

});

module.exports = router;
