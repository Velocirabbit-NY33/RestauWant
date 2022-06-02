import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import React from 'react';

const googleAuthHelper = function () {
  window.open('http://localhost:8080/auth/google', '_self');
};

function LogIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // handle input changes
  // - FULL NAME HANDLER
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  // - USERNAME HANDLER
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const sendToVerify = () => {
    axios.post('/user/login', {
      userName: username,
      password: password,
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        window.location.assign('http://localhost:3000/');
      }
      setUsername('');
      setPassword('');
    }).catch(err => console.log(err));
  };
  return (
    <div className='logback'>
      <div className='logbox'>
        <h2>Please Log in below </h2>

        <button onClick={googleAuthHelper} className='googleAuth-btn'>
          <img
            src='https://colorlib.com/etc/lf/Login_v5/images/icons/icon-google.png'
            alt='GOOGLE'
          />
          oogle
        </button>
        <div className='or'>OR</div>

        <div className=''>
          <input
            onChange={usernameHandler}
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

        <button
          className='logbtn'
          onClick={sendToVerify}
          // onClick={props.helperFunc}
        >Log In</button>
      </div>
    </div>
  );
}

export default LogIn;
