import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import NavBar from '../../components/NavBar/NavBar';
import NoteList from '../../components/NoteList/NoteList';
import * as notesAPI from '../../utilities/notes-api';
import NewNoteForm from '../../components/NewNoteForm/NewNoteForm';
import EditNoteForm from '../EditNoteForm/EditNoteForm';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [notes, setNotes] = useState([]);

  async function addNote(note) {
    const newNote = await notesAPI.addNote(note);
    setNotes([...notes, newNote]);
  }

  useEffect(function() {
    async function getNotes() {
      const userNotes = await notesAPI.getNote();
      setNotes(userNotes);
    }
    getNotes();
  }, []);

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <NewNoteForm addNote={addNote} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={ <NoteList notes={notes} setNotes={setNotes}/> } />
              <Route path='/:id/edit' element={ <EditNoteForm /> } />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
