import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <div className="background" />
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
