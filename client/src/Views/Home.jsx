import React from 'react';
import SearchForm from '../Components/SearchForm';
import LoginForm from '../Components/Login'
import RegisterForm from '../Components/Register'

const Home = () => {

  //modal
  // return (
  //   <>
  //   <div>
  //     <div style={{marginLeft: '70%', marginTop: '14px', display: 'flex', justifyItems: 'right'}}>
  //       <LoginForm />
  //       <RegisterForm />
  //     </div>
  //     <div className="ui segment">
  //     <img src='/client/public/bookstorm.jpg'/>

  //     </div>
    
    
  //     <div className="ui segment">
  //       <SearchForm />
  //     </div>
      
  //   </div>
  //   </>
  // );

    //table
    return (
      <>
      <div>
        <div style={{marginLeft: '55%', marginTop: '14px', display: 'flex', justifyItems: 'right'}}>
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
