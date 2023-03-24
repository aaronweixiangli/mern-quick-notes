import { useState } from "react";
import * as notesAPI from '../../utilities/notes-api';
import { Link } from "react-router-dom";

export default function NoteList({notes, setNotes}) {
    const notesList = notes.map((n, idx) => <li key={idx}>
        {n.text} &nbsp; 
        date: {new Date(n.createdAt).toLocaleString()} &nbsp; 
        <Link to={`/${n._id}/edit`}>Edit</Link>
        <button onClick={()=>handleDelete(n)} >Delete</button></li>)
    const [sortState, setSortState] = useState(true);
    function handleSort() {
        let sortedNotes;
        if (sortState) {
            sortedNotes = notes.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else {
            sortedNotes = notes.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        setSortState(!sortState);
        setNotes(sortedNotes)
    }
    
    // async function handleEdit(id) {
    //     const updatedNote = await notesAPI.editNote(id);
    // }

    async function handleDelete(note) {
        const deletedNote = await notesAPI.deleteNote(note);
        const updatedNotes = notes.filter((n) => n._id !== deletedNote._id);
        setNotes(updatedNotes);
        // notes.map((n)=> n._id === updateNote._id ? updatedNote : n)
    }

    return (
        <>
            <h1>NoteList</h1>
            { notesList.length ? 
            <>
                <button onClick={handleSort}>Sort by Date</button>
                <ul>
                    {notesList}
                </ul>
            </>
             : 
             <h3>No Notes Yet!</h3> }
        </>
    )
}