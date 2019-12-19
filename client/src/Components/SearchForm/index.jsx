import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'semantic-ui-react';

const genreOptions = [
  { value: 'romance', text: 'romance' },
  { value: 'fantasy', text: 'fantasy' },
  { value: 'horror', text: 'horror' },
  { value: 'crime', text: 'crime' },
  { value: 'thriller', text: 'thriller' },
];

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      year: '',
      genre: '',
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { title, author, year, genre } = this.state;
    const response = await fetch(`/api/books?title=${title}&author=${author}&year=${year}&genre=${genre}`);
    const data = await response.json();
    console.log(data);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Input placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Input placeholder="Author" name="author" value={this.state.author} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Input placeholder="Year" name="year" type="number" value={this.state.year} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Select
            placeholder="Genre"
            name="genre"
            value={this.state.genre}
            onChange={this.handleChange}
            options={genreOptions}
          />
        </Form.Field>
        <Button type="submit">Show me the books!!!</Button>
      </Form>
    );
  }
}

export default SearchForm;
