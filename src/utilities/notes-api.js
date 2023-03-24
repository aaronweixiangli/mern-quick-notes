import sendRequest from "./send-request";

const BASE_URL = '/api/notes';

export async function addNote(newNote) {
    return sendRequest(`${BASE_URL}/create`, 'POST', newNote);
}

export async function getNote() {
    return sendRequest(BASE_URL);
}

export async function deleteNote(note) {
    return sendRequest(`${BASE_URL}/delete`, 'DELETE', note);
}

export async function getNoteById(id) {
    return sendRequest(`${BASE_URL}/${id}/edit`);
}

export async function updateNote(id, newNote) {
    return sendRequest(`${BASE_URL}/${id}/update`, 'PUT', newNote)
}