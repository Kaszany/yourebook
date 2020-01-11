import React from 'react';
import LoginForm from '../Components/Login/Auth'
import RegisterForm from '../Components/Login/Register'

const Login = () => {
  return (  
    <div>
        <div style={{marginTop: '14px', display: 'flex', justifyContent: 'center'}}>
          <LoginForm />
          <RegisterForm />
        </div>
        
        <div className="ui segment">
          <img src='./bookstorm.jpg' alt='book in storm' style={{width:'100%'}}/>
        </div>
    </div>
    
  )
};

export default Login;
