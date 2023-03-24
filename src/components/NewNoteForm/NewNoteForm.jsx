import * as notesAPI from "../../utilities/notes-api"

import { useState } from "react";

export default function NewNoteForm( {addNote} ) {
    const [newNote, setNewNote] = useState({
        text: ''
    });

    function handleChange(evt) {
        setNewNote({
            [evt.target.name]: evt.target.value
        })
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        // to-do: api, route
        addNote(newNote);
        setNewNote({
            text: ''
        })
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Text</label>
            <input type="text" name="text" value={newNote.text} onChange={handleChange} required />
            <button type="submit">Add Note</button>
      </form>
    )
}