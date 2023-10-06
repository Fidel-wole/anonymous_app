import { useState } from 'react';

import React from 'react';
import LoginPage from '@react-login-page/page1';
import {Logo} from '@react-login-page/page1';
import LoginLogo from 'react-login-page/logo-rect'
import {Input} from '@react-login-page/page1';
const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [avatar, setAvatar] = useState('');
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    // const handleAvatarChange = (e)=>{
    //   setAvatar(e.target.value);
    // }
    const handleSignup = async (e) => {
      e.preventDefault();
  
      const signupData = {
        username: username,
        password: password,

      };
  
      try {
        const response = await fetch('http://localhost:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupData),
        });
  
        if (response.ok) {
          // Authentication successful
          const data = await response.json();
  
          
          // Store the token in local storage
          localStorage.setItem('token', data.token);
  
          // Redirect to the home page or another protected route
          window.location.href = "/";
        } else {
          // Authentication failed
          console.error('Signup failed');
        }
      } catch (error) {
        console.error('Error occurred during Signup:', error);
      }
    };
  return (
    <form onSubmit={handleSignup} encyType = "multipart/form">

    <LoginPage style={{height: 680}}>

      <Logo>
        <LoginLogo />
      </Logo>
    <Input name='username' type='text' placeholder='username' value={username}  onChange={handleUsernameChange}/>
    <Input name='password' type='text' placeholder='password' value={password} visibility ={false} onChange={handlePasswordChange}/>
    {/* <Input name='avatar'  type='file' placeholder='Upload an image' value={avatar} onChange ={handleAvatarChange} /> */}
    </LoginPage>
    </form>
  )
}

export default Signup