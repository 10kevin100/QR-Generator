
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QrCode from './Components/QrCode';


function App() {
  return (
    <div className='App'>

    <Router>
      <Routes>
        <Route path="/" element={<QrCode/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
