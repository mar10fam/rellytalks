import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Messages from './pages/Messages';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default App;
