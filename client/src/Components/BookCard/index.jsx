import React from 'react';
import { Card, Modal, Button, Image, Header, ModalActions } from 'semantic-ui-react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import DeleteBook from '../DeleteBook';

const BookCard = ({ book }) => {
  const { title, author, genre, year, imgURL } = book;

  const handleDownload = () => {
    axios({
      method: 'get',
      url: `/api/PDFs.files/${book.PDF}`,
      responseType: 'blob',
    }).then(response => {
      fileDownload(response.data, `${book.title}.pdf`);
    });
  };

  return (
    <>
      <Card color="grey" key={book._id}>
        <Card.Content>
          <div  className="ui content" >
            <div>
              <Card.Header>{title}</Card.Header>
              <Card.Meta>{author}</Card.Meta>
              <Card.Meta>{year} r.</Card.Meta>
            </div>
            <div>{imgURL && <Image size="tiny" src={imgURL} />}</div>
          </div>
          <div className="ui extra content">
          <Modal 
            size={'large'}
            trigger={
              
              <Button
                type="submit"
                className="ui olive button"
                size="tiny"
                icon="eye"
                labelPosition="right"
                content="Show me this book"
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
            <ModalActions>
              <Button
                icon="file pdf"
                color="red"
                onClick={() => handleDownload()}
                style={{ marginBottom: '15px' }}
                floated="right"
              />
            </ModalActions>
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
