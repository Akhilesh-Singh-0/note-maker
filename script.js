const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveBtn = document.getElementById('saveBtn');
const saveNote = document.getElementById('saveNote');

let notes = [];
let editingNoteId = null;

function loadNotes() {
    const stored = localStorage.getItem('notes');
    if (stored) {
        notes = JSON.parse(stored);
    }
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNotes(title, content) {
    notes.push({
        id: Date.now(),
        title,
        content,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    saveNotes();
    renderNotes();
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    renderNotes(); 
}

function updateNote(id, title, content) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    note.title = title;
    note.content = content;
    note.updatedAt = Date.now(); 

    saveNotes();
    renderNotes();
}

function createNoteElement(note) {
    const li = document.createElement('li');

    const titleEl = document.createElement('h3');
    titleEl.textContent = note.title;

    const contentEl = document.createElement('p');
    contentEl.textContent = note.content;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    editBtn.addEventListener('click', () => {
        noteTitle.value = note.title;
        noteContent.value = note.content;
        editingNoteId = note.id;
    });

    deleteBtn.addEventListener('click', () => {
        deleteNote(note.id);
    });

    li.append(titleEl, contentEl, editBtn, deleteBtn);
    return li;
}

function renderNotes() {
    saveNote.innerHTML = "";

    for (let note of notes) {
        const el = createNoteElement(note);
        saveNote.appendChild(el);
    }
}

saveBtn.addEventListener('click', () => {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (!title || !content) return;

    if (editingNoteId === null) {
        addNotes(title, content);
    } else {
        updateNote(editingNoteId, title, content);
    }

    noteTitle.value = '';
    noteContent.value = '';
    editingNoteId = null;
});

loadNotes();
renderNotes();