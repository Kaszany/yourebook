import React from 'react';
import { Card, Modal, Button, Icon, Image, Header } from 'semantic-ui-react';
import DeleteBook from '../DeleteBook';


const BookCard = ({ book }) => {
  const { title, author, genre, year, imgURL } = book;
  return (
    <>
      <Card color="blue" key={book._id}>
        <Card.Content>
          {/* {imgURL && <Image floated="right" size="tiny" src={imgURL} />} */}
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{author}</Card.Meta>
          <Card.Meta>{year}</Card.Meta>
          <Modal
            size={'large'}
            trigger={
              <Button
                type="submit"
                size="tiny"
                color="blue"
                icon="redo"
                labelPosition="right"
                content="Show me this book"
                floated="right"
              />
            }
          >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content image>
              {/* {imgURL && <Image wrapped size="medium" src={imgURL} />} */}
              <Modal.Description>
                <Header>Details:</Header>
                <p>Author: {author}</p>
                <p>Year: {year}</p>
                <p>Genre: {genre}</p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <DeleteBook key={book._id} book={book} />
            </Modal.Actions>
          </Modal>
        </Card.Content>
      </Card>
    </>
  );
};

export default BookCard;
