import React, { Component, Error } from 'react';
import { Form, Input, Button, Select } from 'semantic-ui-react';
import genreOptions from '../../utils/genreOptions';
import getToken from '../../utils/getToken';
import {withRouter} from 'react-router-dom';
import getEmail from '../../utils/getEmail';
class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      year: '',
      genre: '',
      books: [],
      email: null,
      error: false
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();
      const { title, author, year, genre } = this.state;
      const headers = {
        'x-auth-token': getToken()
      };
      const response = await fetch(`/api/books?title=${title}&author=${author}&year=${year}&genre=${genre}&email=${getEmail()}`, {
        headers: headers
      });
      const data = await response.json();
      if (data.length === 0) {
        alert('The library does not contain this book');
      } else if (
        this.state.author === '' &&
        this.state.title === '' &&
        this.state.year === '' &&
        this.state.genre === ''
      ) {
        alert('You have not selected any search options');
      } else if(data) {
        //data.length = 5; - gdy chcę ograniczyć ilość
        this.setState({ books: data });
        this.props.findData(data);
        this.props.handleOpen();
      }
    } catch (err) {
      console.log(err);
      this.setState({ error: true})
      this.props.history.push('/login');
    } 

  };

  render() {
  if(this.state.error) { 
    return <Error />
  } else 
  return (
      <Form style={{ marginTop: '30px' }}>
        <Form.Field>
          <div className="ui labeled input">
            <label className="ui right pointing label" style={{ width: '40px' }}>
              <i className="book icon"></i>
            </label>
            <Input placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
          </div>
        </Form.Field>
        <Form.Field>
          <div className="ui labeled input">
            <label className="ui right pointing label" style={{ width: '40px' }}>
              <i className="user icon"></i>
            </label>
            <Input placeholder="Author" name="author" value={this.state.author} onChange={this.handleChange} />
          </div>
        </Form.Field>
        <Form.Field>
          <div className="ui labeled input">
            <label className="ui right pointing label" style={{ width: '40px' }}>
              <i className="calendar check out icon"></i>
            </label>
            <Input placeholder="Year" name="year" type="number" value={this.state.year} onChange={this.handleChange} />
          </div>
        </Form.Field>
        <Form.Field>
          <div className="ui labeled input">
            <label className="ui right pointing label" style={{ width: '40px' }}>
              <i className="list alternate outline icon"></i>
            </label>
            <Select
              placeholder="Genre"
              name="genre"
              value={this.state.genre}
              onChange={this.handleChange}
              options={genreOptions}
            />
          </div>
        </Form.Field>
        <Button
          className="orange ui button big"
          style={{ width: '250px', marginLeft: '110px', marginTop: '10px' }}
          onClick={this.handleSubmit}
          icon="eye"
          labelPosition="right"
          content="Find books"
        />
      </Form>
    );
  }
}

export default withRouter(SearchForm);
