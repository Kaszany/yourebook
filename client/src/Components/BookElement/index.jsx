import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import getToken from '../../utils/getToken';

class BookElement extends Component {
  getBooks = async e => {
    try {
      e.preventDefault();
      const headers = {
        'x-auth-token': getToken(),
      };
      const response = await fetch(`/api/books`, {
        headers: headers,
      });
      const data = await response.json();
      if (data.length === 0) {
        alert('The library does not contain this book');
      } else {
        this.props.showBooks(data);
      }
    } catch (error) {
      alert('The value is not allowed');
    }
  };

  render() {
    return (
      <>
        <Button
          className="ui yellow button big"
          style={{ marginTop: '10px', width: '250px' }}
          onClick={this.getBooks}
          icon="eye"
          labelPosition="right"
          content="Show all books"
        />
      </>
    );
  }
}

export default BookElement;
