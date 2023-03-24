const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/notes'

// POST /api/notes/create
router.post('/create', ensureLoggedIn, notesCtrl.create);

// Get /api/notes
router.get('/', ensureLoggedIn, notesCtrl.index);

// DELETE /api/notes/delete
router.delete('/delete', ensureLoggedIn, notesCtrl.deleteNote);

// GET /api/notes/:id/edit
router.get('/:id/edit', ensureLoggedIn, notesCtrl.edit);

// PUT /api/notes/:id/update
router.put('/:id/update', ensureLoggedIn, notesCtrl.update);

module.exports = router;