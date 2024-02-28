import './App.css';
import Register from './component/user-auth/Register';
import Login from './component/user-auth/Login';
import NotesDashboard from './component/NotesDashboard';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<NotesDashboard/>} />
    </Routes>
  );
}

export default App;