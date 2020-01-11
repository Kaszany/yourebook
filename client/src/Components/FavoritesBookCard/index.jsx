import React from 'react';
import DeleteFavoritesButton from '../DeleteFavoritesButton';
import { Card, Modal, Button, Image, Header } from 'semantic-ui-react';
const FavoritesBookCard = ({ book, favorites, modalFavoritesClose }) => {
  const { title, author, genre, year, imgURL } = book;
  
  return (
    <>
      <Card color="red" key={book._id}>
        <Card.Content>
          {imgURL && <Image floated="right" size="tiny" src={imgURL} />}
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{author}</Card.Meta>
          <Card.Meta>{year}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
          <Modal
            size={'large'}
            trigger={
              <Button
                type="submit"
                size="tiny"
                color="red"
                icon="redo"
                labelPosition="right"
                content="Show"
                floated="left"
              />
            }
          >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content image>
              {imgURL && <Image wrapped size="medium" src={imgURL} />}
              <Modal.Description>
                <Header>Details:</Header>
                <p>Author: {author}</p>
                <p>Year: {year}</p>
                <p>Genre: {genre}</p>
              </Modal.Description>
            </Modal.Content>
            <DeleteFavoritesButton book={book} favorites={favorites} modalFavoritesClose={modalFavoritesClose}></DeleteFavoritesButton>
          </Modal>
        </Card.Content>
      </Card>
    </>
  );
};

export default FavoritesBookCard;
