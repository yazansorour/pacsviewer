// Login form component
import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../../../ui/src/components/Input'
import Button from '../../../../ui/src/components/Button'
import Typography from '../../../../ui/src/components/Typography'
import InputLabelWrapper from '../../../../ui/src/components/InputLabelWrapper'

import { useTranslation } from 'react-i18next';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation('Modals');


  const login = async (event) =>{
    event.preventDefault();
    var formdata = new FormData();
    formdata.append("usr", email);
    formdata.append("pwd", password);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch("http://10.10.215.70/api/method/login", requestOptions)
      .then(response => {
        if (response.status == 200){
          handleOnLogin();
        }
        else{
          alert('Invalid username or password')
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleOnLogin = async () => {
    //event.preventDefault();
    try {
      //const response = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', btoa(`${email}`));
      // Redirect to protected route
      window.location.href = "http://10.10.215.70:2055/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="flex flex-col">
        <Typography
          variant="h6"
          color="primaryLight"
          className="flex grow !leading-[1.2]"
          style={{ alignItems: 'center', justifyContent: 'center' , color:'white' }}
          data-cy="modal-header"
        >
          Login
        </Typography>
        <div className="w-full mb-4">
          <Input
            value={email}
            onChange={evt => setEmail(evt.target.value)}
            label={'email'}
            placeholder={'email'}
          />
        </div>
        <div className="w-full mb-4">
          <Input
            value={password}
            onChange={evt => setPassword(evt.target.value)}
            label={'password'}
            placeholder={'password'}
            type='password'
          />
        </div>
        <Button
          className='mt-5'
          onClick={login}
          color="primary"
        >
          {t('Login')}
        </Button>
      </div>
    </div>
  );
};

export default Login;
