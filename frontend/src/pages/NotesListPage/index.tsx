import { useState, useEffect } from 'react';
import { ListItem } from '../../components/ListItem';
import { Header } from '../../components/Header';
import { useNavigate } from 'react-router-dom';

import { getCookie } from '../../utils/cookieUtils';

import { Note } from '../../types';

const NotesListPage = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = async () => {
    const response = await fetch('/api/notes/');
    const data = await response.json();
    setNotes(data);
  };

  const addNote = async () => {
    const csrfToken = getCookie('csrftoken') as string;
    fetch('/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ body: 'New Note' })
      })
      .then(response => response.json())
      .then(data => {
        navigate(`/notes/${data.id}`);
      })
      .catch(error => console.error('Error:', error));
  }

  const handleSubmit = () => {
    addNote();
  }

  useEffect(() => {
    getNotes();
    document.title = 'My Notes';
  }, []);

  return (
    <>
      <Header />
      {notes.map((note, index) => {
        return <ListItem key={index} note={note} />;
      })}
      <div className="mt-8">
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          New Note
        </button>
      </div>
    </>
  );
};

export { NotesListPage };
