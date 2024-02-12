import { Route, Routes } from 'react-router-dom';
import { NotesListPage, NotePage } from '../pages';

const DefinedRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<NotesListPage />} />
        <Route path="/notes/:id" element={<NotePage />} />
      </Route>
    </Routes>
  );
};

export { DefinedRoutes };
