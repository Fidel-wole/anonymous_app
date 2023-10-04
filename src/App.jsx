import React from 'react';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import SignInPage from './pages/auth/login/Login';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './protectedRouth';
import Signup from './pages/auth/signup/Signup';
import PostMessage from './pages/postMessage/PostMessage';

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/'  && <Header />}
      
    
      <Routes>
      <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<SignInPage />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} />}
        />
        <Route
          path="/messages"
          element={<ProtectedRoute element={<Messages />} />}
        />
        <Route
          path="/message/:messageId"
          element={<ProtectedRoute element={<Message />} />}
        />
         <Route
          path="/message/:anonymousId/:userId"
          element={<PostMessage/>} />
      </Routes>
    </>
  );
}

export default App;
