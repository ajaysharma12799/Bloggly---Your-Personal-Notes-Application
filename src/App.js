import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setCurrentUser(user);
            console.log(user);
        }
        else {
            setCurrentUser(null);
        }
    })
}, [currentUser]);

  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path='/' element={<HomePage currentUser={currentUser} />} />
        <Route 
          path='/dashboard' 
          element={
            <PrivateRoute currentUser={currentUser}>
              <Dashboard currentUser={currentUser} />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login currentUser={currentUser} />} />
        <Route path='/register' element={<Register currentUser={currentUser} />} />
      </Routes>
    </React.Fragment>
  )
}

export default App
