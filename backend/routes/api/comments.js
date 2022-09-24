// Contains resources for route paths beginning with '/api/artists'
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment, sequelize } = require('../../db/models');

const router = express.Router();

// ***EDIT COMMENT (Feature 3)***
router.put('/:commentId', requireAuth, async (req, res) => {
  try {
    const { user } = req;
    const { body } = req.body;

    const editComment = await Comment.findByPk(req.params.commentId);

    await editComment.update({ body: body });

    res.json(editComment);
  } catch (err) {
    res.status(404).json({
      'message': 'Comment couldn\'t be found',
      'statusCode': 404
    });
  }
});

// ***DELETE COMMENT (Feature 3)***
router.delete('/:commentId', requireAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.findByPk(req.params.commentId);

    await deleteComment.destroy();

    res.json({ 'message': 'Successfully deleted', 'statusCode': 200 });
  } catch (err) {
    res.status(404).json({
      'message': 'Comment couldn\'t be found',
      'statusCode': 404
    });
  }
});

module.exports = router;
