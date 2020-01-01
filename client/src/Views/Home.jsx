import React from 'react';
import SearchForm from '../Components/SearchForm';
import LoginForm from '../Components/Login'
import RegisterForm from '../Components/Register'

const Home = () => {
  return (
    <>
    <div>
      <div className="ui segment" style={{marginLeft: '55%', display: 'flex'}}>
        <LoginForm />
        <RegisterForm />
      </div>
      <div className="ui segment">
      <img src='/client/public/bookstorm.jpg'/>

      </div>
    
    
      <div className="ui segment">
        <SearchForm />
      </div>
      
    </div>
    </>
  );
};

export default Home;
