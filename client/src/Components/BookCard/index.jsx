import React, { useState } from 'react';
import AddFavorites from '../AddFavorites';
import BookEdition from '../BookEdition';
import { Card, Modal, Button, Image, Header } from 'semantic-ui-react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import DeleteBook from '../DeleteBook';
const BookCard = ({ book, favorites, handleShowClose, removeBook }) => {
  const { title, author, genre, year, imgURL } = book;
  const [PDFResponse, setResponse] = useState('');
  const handleDownload = () => {
    axios({
      method: 'get',
      url: `/api/PDFs.files/${book.PDF}`,
      responseType: 'arraybuffer',
    })
      .then(response => {
        setResponse('Your download should begin in a second');
        fileDownload(response.data, `${book.title}.pdf`);
      })
      .catch(err => {
        const decodedErr = String.fromCharCode.apply(null, new Uint8Array(err.response.data));
        setResponse(decodedErr);
      });
  };

  return (
    <>
      <Card color="grey" key={book._id} className="entrance-center">
        <Card.Content>
          {imgURL && <Image floated="right" size="tiny" src={imgURL} />}
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{author}</Card.Meta>
          <Card.Meta>{year}</Card.Meta>
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
            <Modal.Header>
              {title} <DeleteBook removeBook={removeBook} book={book} />
            </Modal.Header>
            <Modal.Content image>
              {imgURL && <Image wrapped size="medium" src={imgURL} />}
              <Modal.Description>
                <Header>Details:</Header>
                <p>Author: {author}</p>
                <p>Year: {year}</p>
                <p>Genre: {genre}</p>
                <Button
                  icon="file pdf"
                  color="red"
                  size="big"
                  onClick={() => handleDownload()}
                  style={{ marginBottom: '15px' }}
                  floated="left"
                />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions style={{padding: '0'}}>
              <AddFavorites book={book} favorites={favorites}></AddFavorites>
              <BookEdition book={book} favorites={favorites} handleShowClose={handleShowClose}></BookEdition>
              {PDFResponse === 'Your download should begin in a second' ? (
                <h4 style={{ color: 'green', display: 'flex', justifyContent: 'center', margin: '0' }}>
                  {PDFResponse}
                </h4>
              ) : (
                <h4 style={{ color: 'red', display: 'flex', justifyContent: 'center', margin: '0' }}>{PDFResponse}</h4>
              )}
            </Modal.Actions>
          </Modal>
        </Card.Content>
      </Card>
    </>
  );
};

export default BookCard;
