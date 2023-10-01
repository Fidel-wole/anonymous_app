import React from 'react';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import SignInPage from './pages/auth/login/Login';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './protectedRouth';

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
      {location.pathname !== '/' && <Header />}
      <Routes>
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
      </Routes>
    </>
  );
}

export default App;
