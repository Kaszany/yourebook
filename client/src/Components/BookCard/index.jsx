import React from 'react';
import { Card, Modal, Button, Image, Header } from 'semantic-ui-react';

const BookCard = ({ book }) => {
  const { title, author, genre, year, imgURL } = book;
  return (
    <>
      <Card color="grey" key={book._id}>
        <Card.Content>
          <div style={{marginBottom:'10px'}}>
          {imgURL && <Image floated="right" size="tiny" src={imgURL} />}
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{author}</Card.Meta>
          <Card.Meta>{year}</Card.Meta>
          </div>
          <Modal
            size={'large'}
            trigger={
              <Button
                type="submit"
                size="tiny"
                color="olive"
                icon="eye"
                labelPosition="right"
                content="Show me this book"
                // style={{marginTop:'60px'}}
                floated="right"
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
          </Modal>
        </Card.Content>
      </Card>
    </>
  );
};

export default BookCard;
