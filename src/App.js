import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ContextProvider } from './Components/context';
import Verify from './Pages/Verify';
import Login from './Pages/Login';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/Register';

const App = () => {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify/:userId/:verificationToken" element={<Verify />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
