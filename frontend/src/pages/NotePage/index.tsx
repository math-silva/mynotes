import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getCookie } from '../../utils/cookieUtils';

import { Note } from '../../types';

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  const getNote = async () => {
    try {
      const response = await fetch(`/api/notes/${id}`);
      const data = await response.json();
      setNote(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async () => {
    const csrfToken = getCookie('csrftoken') as string;
    fetch(`/api/notes/${id}/`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(note)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  const deleteNote = async () => {
    const csrfToken = getCookie('csrftoken') as string;
    fetch(`/api/notes/${id}/`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  const handleSubmit = () => {
    if (note?.body === '') {
      deleteNote();
    } else {
      updateNote();
    }
    navigate('/');
  };

  const handleDelete = () => {
    deleteNote();
    navigate('/');
  };

  useEffect(() => {
    getNote();
    document.title = `Note ${id}`;
  }, [id]);

  return (
    <div>
      <h3 onClick={handleSubmit} className="cursor-pointer hover:underline">
        Go back
      </h3>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl mb-8 font-bold">Note {id}</h1>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded"
        >
          Delete Note
        </button>
      </div>
      <div className="font-semibold">
        {loading ? (
          <p>Loading...</p>
        ) : note ? (
          <textarea
            onChange={e => setNote({ ...note, body: e.target.value })}
            rows={4}
            className="block p-2.5 w-full text-sm rounded-lg border bg-slate-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            value={note?.body}
          ></textarea>
        ) : (
          <p>The note {id} does not exist</p>
        )}
      </div>
    </div>
  );
};

export { NotePage };
