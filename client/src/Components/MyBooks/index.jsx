import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

const MyBooks = ({ showBooks }) => {
  const showMyBooks = async () => {
    const { data } = await axios.get(`/api/books/my`);
    if (data.length === 0) alert('You dont have any books');
    else {
      showBooks(data, 'My books');
    }
  };

  return <Button color="olive" icon="book" content="My Books" onClick={showMyBooks} />;
};

export default MyBooks;
