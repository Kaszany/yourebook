import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';


class DeleteFavoritesButton extends Component {

    state = { 
            disabled: false,
            };

    removeFromFavorites = async (e) => { 
    Array.prototype.remove = function (v) 
        {
            if (this.indexOf(v) != -1) {
                this.splice(this.indexOf(v), 1);
                return true;
            }
            return false;
        }
        this.props.favorites.remove(this.props.book);
        this.setState({disabled:true})
        alert( "You have removed " + this.props.book.title.toUpperCase() + " from your favorites" )
      };


    render() {
        return (
            <Button
                size="massive" 
                color="red"
                icon="remove circle"
                labelPosition="right"
                label="Remove this book from favorite"
                floated="right"
                onClick={this.removeFromFavorites}
                disabled = {this.state.disabled}
            />
        );
    }
}

export default DeleteFavoritesButton;