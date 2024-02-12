import { Link } from 'react-router-dom';

import { Note } from '../../types';

interface ListItemProps {
  note: Note;
}

const ListItem = ({ note }: ListItemProps) => {
  return (
    <p className="font-semibold mb-4">
      <Link to={`/notes/${note?.id}`} className="hover:underline">
        {note?.body}
      </Link>
    </p>
  );
};

export { ListItem };
