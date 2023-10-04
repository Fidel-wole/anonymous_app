// import React from 'react'
// import { Link } from 'react-router-dom'
 import { useState } from 'react';

import React from 'react'
import './login.css'
import LoginPage from '@react-login-page/page1';
import {Logo} from '@react-login-page/page1';
import LoginLogo from 'react-login-page/logo-rect'
import {Input} from '@react-login-page/page1';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Authentication successful
        const data = await response.json();

        // Store the token in local storage
        localStorage.setItem('token', data.token);

        // Redirect to the home page or another protected route
        window.location.href = "/home";
      } else {
        // Authentication failed
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };
  return (
    

    <form onSubmit={handleLogin}>

    <LoginPage style={{height: 650}}>

      <Logo>
        <LoginLogo />
      </Logo>
    <Input name='username' type='text' placeholder='username' value={username}  onChange={handleUsernameChange}/>
    <Input name='password' type='text' placeholder='password' value={password} visibility ={false} onChange={handlePasswordChange}/>
    </LoginPage>
    </form>

  )
}

export default Login