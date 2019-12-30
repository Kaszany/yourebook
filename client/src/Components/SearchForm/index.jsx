import React, { Component } from 'react';
import { Form, Input, Button, Select, Icon } from 'semantic-ui-react';

const genreOptions = [
  { value: '', text: 'cancel this selection' },
  { value: 'romance', text: 'Romance' },
  { value: 'fantasy', text: 'Fantasy' },
  { value: 'horror', text: 'Horror' },
  { value: 'crime', text: 'Crime' },
  { value: 'thriller', text: 'Thriller' },
];

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      year: '',
      genre: '',
      books: []
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    try {
    e.preventDefault();
    const { title, author, year, genre} = this.state;
    const response = await fetch(`/api/books?title=${title}&author=${author}&year=${year}&genre=${genre}`);
    const data = await response.json();
    if (data.length === 0 ){
      alert('The library does not contain this book');
    }
    else if((this.state.author === '' && this.state.title === '' && this.state.year === '' && this.state.genre === '' && this.state.PDF === '' )){
      alert('You have not selected any search options');
    }
    else{
      //data.length = 5; - gdy chcę ograniczyć ilość
      this.setState( {books: data} )
      this.props.findData(data);
      this.props.handleOpen();
    }
    } catch (error) {
      console.log(error);
    alert('The value is not allowed');
  }
  };

  render() {
    return (  
      <Form >
        <Form.Field >
        <Icon color="blue" name='hand point down outline' /><Icon color="blue" name='keyboard' /><Input  placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        </Form.Field >
        <Form.Field >
        <Icon color="blue" name='hand point down outline' /><Icon color="blue" name='keyboard' /><Input placeholder="Author" name="author" value={this.state.author} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field >
        <Icon color="blue" name='hand point down outline' /><Icon color="blue" name='keyboard' /><Input placeholder="Year" name="year" type="number" value={this.state.year} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field >
        <Icon color="blue" name='hand point down outline' /><Icon color="blue" name='list alternate' /><Select
            placeholder="Genre"
            name="genre"  
            value={this.state.genre}
            onChange={this.handleChange}
            options={genreOptions}
          />
        </Form.Field>
        <Button className="ui button" color="blue" onClick={this.handleSubmit}>
        <Icon name='redo' /> Find books!
        </Button>
      </Form>  
    );  
  }
}

export default SearchForm;
