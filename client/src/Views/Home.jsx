import React from 'react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import NavBar from '../Components/NavBar';


const Home = () => {
  return (
    <>
      <NavBar/>
      <SearchForm />
      <AddBook />
    </>
  );
};

export default Home;
