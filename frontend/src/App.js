import './App.css';
import { Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Glassform from './components/Glassform';
import Register from './components/Register';
import Chat from './components/Chat';
import ChatProvider from './Context/ChatProvider';


function App() {
  return (
    <>
 
   <ChatProvider>
    <Navbar val="Login"/>
    <Routes>

     
      

      <Route path="/" element={<><h1 style={{color:"red"}}>This is Home</h1></>} />
      <Route path="/about" element={<><h1>This is About us</h1></>} />
      <Route path="/contact" element={<><h1>This is contact</h1></>} />
      <Route path="/download" element={<><h1>This is Download</h1></>} />
      <Route path="/login" element={<Glassform/>} />
      <Route path="/signup" element={<Register/>} />
      <Route path="/chat" element={<Chat/>} />
        
    </Routes>
  
    </ChatProvider>
    </>
  );
}

export default App;
