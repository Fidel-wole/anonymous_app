import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import './login.css'

export default function SignInPage() {
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
        <div className="text-center m-5-auto">
            <div>
           
            <h2>Sign in to us</h2>
            <form onSubmit={handleLogin}>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" value={username} onChange={handleUsernameChange} required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" value={password} onChange={handlePasswordChange} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/signup">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        </div>
    )
}