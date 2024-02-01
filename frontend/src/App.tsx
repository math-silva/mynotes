import { Header } from './components/Header';
import { NotesListPage } from './pages';

import './App.css';

function App() {
  return (
    <div className="bg-slate-700 h-screen text-white">
      <div className="md:container mx-auto p-8">
        <Header />
        <NotesListPage />
      </div>
    </div>
  );
}

export default App;
