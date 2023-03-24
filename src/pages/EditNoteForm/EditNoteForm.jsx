import * as notesAPI from "../../utilities/notes-api"
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NewNoteForm() {
    const {id} = useParams();
    const [newNote, setNewNote] = useState({
        text: ''
    });
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchNote() {
            const note = await notesAPI.getNoteById( id );
            setNewNote(note);
        }
        fetchNote()
    }, [])


    function handleChange(evt) {
        setNewNote({
            [evt.target.name]: evt.target.value
        })
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        // to-do: api, route
        const updatedNote = await notesAPI.updateNote(id, newNote);
        // need to change notes state here as well
        navigate("/");
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Text</label>
            <input type="text" name="text" value={newNote.text} onChange={handleChange} required />
            <button type="submit">Edit Note</button>
      </form>
    )
}