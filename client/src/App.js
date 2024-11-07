import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Messages from './pages/Messages';

function App() {
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
