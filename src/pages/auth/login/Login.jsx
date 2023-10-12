import React, { useState } from 'react';
import { Circles } from 'react-loader-spinner';
import './login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
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
          wrapperclassName
        />
        <p>Loading...</p>
      </div>
    </div>
  ) : (
    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form" onSubmit={handleLogin}>
				<p>{errorMessage}</p>
        	<span className="login100-form-logo">
						<img src='./anon.jpeg' alt ="" />
					</span>

					<span className="login100-form-title p-b-34 p-t-27">
						Log in
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Enter username">
						<input className="input100" type="text" name="username" placeholder="Username" onChange={handleUsernameChange} />
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Enter password">
						<input className="input100" type="password" name="password" placeholder="Password" onChange={handlePasswordChange}/>
						<span classNameName="focus-input100" data-placeholder="&#xf191;"></span>
					</div>

					<div className="contact100-form-checkbox">
						<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
						<label className="label-checkbox100" for="ckb1">
							Remember me
						</label>
					</div>

					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Login
						</button>
					</div>
<p className='anchor'> Don't have an accont? <a href='/signup'>Sign Up</a></p>
				</form>
			</div>
		</div>
	</div>
  );
};

export default Login;
