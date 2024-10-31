import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { auth } from './firebase'; // Make sure to correctly import auth from Firebase config

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth , async (user) => {
      if(user){
        console.log("logged In")
        navigate('/')
      }
      else{
        console.log("logged Out");
        navigate('/login')
      }
    })

    
    
  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
