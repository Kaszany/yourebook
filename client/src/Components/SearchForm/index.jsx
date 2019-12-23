import React, { Component } from 'react';
import { Form, Input, Button, Select, Icon, Card  } from 'semantic-ui-react';

const genreOptions = [
  { value: '', text: 'cancel this selection' },
  { value: 'romance', text: 'Romance' },
  { value: 'fantasy', text: 'Fantasy' },
  { value: 'horror', text: 'Horror' },
  { value: 'crime', text: 'Crime' },
  { value: 'thriller', text: 'Thriller' },
];

const end = {text: " "};

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      year: '',
      genre: '',
      end: '',
      pdf: ''
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    try {
    e.preventDefault();
    const { title, author, year, genre } = this.state;
    const response = await fetch(`/api/books?title=${title}&author=${author}&year=${year}&genre=${genre}`);
    const data = await response.json();
    if (data.length === 0){
      alert('The library does not contain this book');
      console.log('The library does not contain this book');
    }
    else{
      console.log(data);
      for (var i = 0; i < data.length /*&& i < 5*/; i++){ 
      end.text = "Title: " + data[i].title.toUpperCase() + " * Author: " + data[i].author.toUpperCase() + " * Genre: " + data[i].genre.toUpperCase() + " \n \n" + end.text;
      }
      const five = document.getElementById("fiveBooks");
      five.innerText = end.text;
    }
    }
   catch (error) {
    alert('The value is not allowed');
    console.log('The value is not allowed');
  }

  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
        <Icon value="Title" name='hand point down outline' /><Icon name='keyboard' /><Input placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
        <Icon name='hand point down outline' /><Icon name='keyboard' /><Input placeholder="Author" name="author" value={this.state.author} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
        <Icon name='hand point down outline' /><Icon name='keyboard' /><Input placeholder="Year" name="year" type="number" value={this.state.year} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
        <Icon name='hand point down outline' /><Icon name='list alternate' /><Select
            placeholder="Genre"
            name="genre"  
            value={this.state.genre}
            onChange={this.handleChange}
            options={genreOptions}
          />
        </Form.Field> 
        <Card id="fiveBooks">
        <Card.Content content={end.text} onSubmit={this.handleSubmit}/>        
        </Card>
        <Button type="submit" className="ui button"><Icon name='redo' /> Show me the books</Button>
      </Form>
             
    );
  }
}

export default SearchForm;
