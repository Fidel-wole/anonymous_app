import React, { useState } from 'react';
import { Circles } from 'react-loader-spinner';
import LoginPage from '@react-login-page/page1';
import { Logo } from '@react-login-page/page1';
import LoginLogo from 'react-login-page/logo-rect';
import { Input } from '@react-login-page/page1';
import './login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
    setLoading(true);

    try {
      const response = await fetch('https://anon-backend-qse7.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok) {
        // Authentication successful

        // Store the token in local storage
        localStorage.setItem('token', data.token);

        // Redirect to the home page or another protected route
        window.location.href = '/home';
      } else {
        // Authentication failed
        setErrorMessage(data.error); // Display error message from the server
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="audio">
      <div>
        <Circles
          className="audio"
          height={80}
          width={80}
          radius={9}
          color="rgb(167, 70, 199)"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
        <p>Loading...</p>
      </div>
    </div>
  ) : (
    <form onSubmit={handleLogin}>
      <LoginPage style={{ height: 650 }}>
        <Logo>
          <LoginLogo />
        </Logo>
        <Input name="username" type="text" placeholder="username" value={username} onChange={handleUsernameChange} />
        <Input name="password" type="text" placeholder="password" value={password} visibility={false} onChange={handlePasswordChange} />
        {errorMessage}
      </LoginPage>
    </form>
  );
};

export default Login;
