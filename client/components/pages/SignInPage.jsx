import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import React from 'react';

function SignUp(props) {
  // input states
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // handle input changes
  // - FULL NAME HANDLER
  const fullNameHandler = (e) => {
    setFullName(e.target.value);
  };
  // - USERNAME HANDLER
  const userNameHandler = (e) => {
    setUsername(e.target.value);
  };
  // - EMAIL HANDLER
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  // - PASSWORD HANDLER
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  // Send post request to /users/create
  const createUser = () => {
    axios.post('/user/create', {
      name: fullName,
      userName: username,
      password: password,
    }).then(res => {
      console.log(res);
      if (res.status === 200) window.location.assign('http://localhost:3000/');
      setFullName('');
      setUsername('');
      setEmail('');
      setPassword('');
    }).catch(err => console.log(err));
  };
  return (
    <div className='logback'>
      <div className='signbox'>
        <h2>Sign Up </h2>
        <div className=''>
          <input
            onChange={fullNameHandler}
            value={fullName}
            className=''
            placeholder='Name'
            type='text'
            id='fullName'
            name='fullName'
            required
          />
        </div>
        <div className=''>
          <input
            onChange={userNameHandler}
            value={username}
            className=''
            placeholder='Username'
            type='text'
            id='Username'
            name='Username'
            required
          />
        </div>
        <div className=''>
          <input
            onChange={emailHandler}
            value={email}
            className=''
            placeholder='Email'
            type='email'
            id='email'
            name='email'
          />
        </div>

        <div className=''>
          <input
            onChange={passwordHandler}
            value={password}
            className=''
            placeholder='Password'
            type='password'
            id='password'
            name='password'
            required
          />
        </div>
        <div className=''>
          <button
            className='create-user'
            onClick={createUser}>
              Sign Up!</button>
        </div>
        <div className='or'>OR</div>
        <p>Please use your google account to sign up:</p>
        <a href='http://localhost:8080/auth/google' className='googleAuth-btn'>
          <img
            src='https://colorlib.com/etc/lf/Login_v5/images/icons/icon-google.png'
            alt='GOOGLE'
          />
          oogle
        </a>
      </div>
    </div>
  );
}

export default SignUp;
