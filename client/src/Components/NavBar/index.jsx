import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogOut = e => {
      localStorage.removeItem('email');
      localStorage.removeItem('status');
  }


  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
          as={Link} to='/home'
        />
        <Menu.Item
          name='Collection'
          active={activeItem === 'Collection'}
          onClick={this.handleItemClick}
          as={Link} to='/collection'
        />
        <Menu.Item
          name='Reviews'
          active={activeItem === 'Reviews'}
          onClick={this.handleItemClick}
          as={Link} to='/reviews'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleLogOut}
            as={Link} to='/login'
          />
        </Menu.Menu>
      </Menu>
    )
  }
}