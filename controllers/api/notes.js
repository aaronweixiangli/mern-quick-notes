const Note = require('../../models/note');
const jwt = require('jsonwebtoken');

module.exports = {
  create,
  index,
  deleteNote,
  edit,
  update
};

async function update(req, res) {
  try {
    // delete the note from the db
    const note = await Note.findOne({_id: req.params.id});
    note.text = req.body.text;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function edit(req, res){
  try {
    // delete the note from the db
    const note = await Note.findOne({_id: req.params.id});
    res.json(note);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteNote(req, res) {
  try {
    // delete the note from the db
    const note = await Note.findOneAndDelete({_id: req.body._id});
    res.json(note);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
    try {
      // Add the note to the db
      req.body.user = req.user._id;
      const note = await Note.create(req.body);
      note.save();
      res.json(note);
    } catch (err) {
      res.status(400).json(err);
    }
}

async function index(req, res) {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes)
    } catch (err) {
        res.status(400).json(err);
    }
}