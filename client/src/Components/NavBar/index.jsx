import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Link to="/">
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        </Link>
        <Link to="/collection">
        <Menu.Item
          name='Collection'
          active={activeItem === 'Collection'}
          onClick={this.handleItemClick}
        />
        </Link>
        <Link to="/reviews">
        <Menu.Item
          name='reviews'
          active={activeItem === 'reviews'}
          onClick={this.handleItemClick}
        />
       </Link>
        <Menu.Menu position='right'>
        <Link to="/login">
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Link>
        </Menu.Menu>
      </Menu>
    )
  }
}