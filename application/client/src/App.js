import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Messages from './pages/Messages';

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      <div className="background" />
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
