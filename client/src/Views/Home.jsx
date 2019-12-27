import React, { Component } from 'react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import { Card } from 'semantic-ui-react';

class Home extends Component {
state = { data: [] };

changeData = data => {
this.setState({ data });
}

render(){
  return (
    <>
      <SearchForm changeData={this.changeData} />
      <AddBook />
      <Card>
        <Card.Content>{this.state.data}</Card.Content>        
      </Card>
    </>
  );
}
}

export default Home;
