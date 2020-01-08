import React, { useState } from 'react';
import { Card, Modal, Button, Image, Header, ModalActions } from 'semantic-ui-react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import '../../App.css';

const BookCard = ({ book }) => {
  const { title, author, genre, year, imgURL } = book;
  const [PDFResponse, setResponse] = useState('');
  const handleDownload = () => {
    axios({
      method: 'get',
      url: `/api/PDFs.files/${book.PDF}`,
      responseType: 'stream',
    })
      .then(response => {
        setResponse('Your download should begin in a second');
        fileDownload(response.data, `${book.title}.pdf`);
      })
      .catch(err => {
        setResponse(`${err.response.data}`);
      });
  };

  return (
    <>
      <Card color="grey" key={book._id} className="entrance-center">
        <Card.Content>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <Card.Header>{title}</Card.Header>
              <Card.Meta>{author}</Card.Meta>
              <Card.Meta>{year} r.</Card.Meta>
            </div>
            <div>{imgURL && <Image size="tiny" src={imgURL} />}</div>
          </div>
          <Modal
            className="entrance-left"
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
              {PDFResponse === 'Your download should begin in a second' ? (
                <h5 style={{ color: 'green', display: 'flex', justifyContent: 'center', margin: '0' }}>
                  {PDFResponse}
                </h5>
              ) : (
                <h5 style={{ color: 'red', display: 'flex', justifyContent: 'center', margin: '0' }}>{PDFResponse}</h5>
              )}
            </ModalActions>
          </Modal>
        </Card.Content>
      </Card>
    </>
  );
};

export default BookCard;
