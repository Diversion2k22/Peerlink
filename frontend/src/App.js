import './App.css';
import {BrowserRouter, Route,Routes,Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Glassform from './components/Glassform';
import Register from './components/Register';
import Chat from './pages/Chat';
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar val="Login"/>
    <Routes>

      <Route element={<PrivateComponent/>}>
        <Route path="/chat" element={<><Chat/></>} />
      </Route>

      <Route path="/" element={<><h1>This is Home</h1></>} />
      <Route path="/about" element={<><h1>This is About us</h1></>} />
      <Route path="/contact" element={<><h1>This is contact</h1></>} />
      <Route path="/download" element={<><h1>This is Download</h1></>} />
      <Route path="/login" element={<Glassform/>} />
      <Route path="/signup" element={<Register/>} />
        
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
