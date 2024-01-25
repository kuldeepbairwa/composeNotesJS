const Note = require('../models/note');
const createResponse = require('../utils/genericResponse');

// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.uid; // Assuming you have the user ID in req.uid

        const note = await Note.create({ title, content, user: user_id });

        res.json(createResponse(true, 'Note created', { note }));
    } catch (error) {
        res.status(500).json(createResponse(false, 'Something went wrong', `${error}`));
    }
};

// Get all notes for a user
const getAllNotes = async (req, res) => {
    try {
        const user_id = req.uid; // Assuming you have the user ID in req.uid
        const notes = await Note.find({ user: user_id });

        res.json(createResponse(true, 'Notes retrieved', { notes }));
    } catch (error) {
        res.status(500).json(createResponse(false, 'Something went wrong', `${error}`));
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note_id = req.params.id;
        const user_id = req.uid; // Assuming you have the user ID in req.uid

        const updatedNote = await Note.findOneAndUpdate(
            { _id: note_id, user: user_id },
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json(createResponse(false, 'Note not found', null));
        }

        res.json(createResponse(true, 'Note updated', { note: updatedNote }));
    } catch (error) {
        res.status(500).json(createResponse(false, 'Something went wrong', `${error}`));
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const note_id = req.params.id;
        const user_id = req.uid; // Assuming you have the user ID in req.uid

        const deletedNote = await Note.findOneAndDelete({ _id: note_id, user: user_id });

        if (!deletedNote) {
            return res.status(404).json(createResponse(false, 'Note not found', null));
        }

        res.json(createResponse(true, 'Note deleted', { note: deletedNote }));
    } catch (error) {
        res.status(500).json(createResponse(false, 'Something went wrong', `${error}`));
    }
};

module.exports = {
    createNote,
    getAllNotes,
    updateNote,
    deleteNote
};
