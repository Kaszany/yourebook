import React from 'react';
import AddFavorites from '../AddFavorites';
import BookEdition from '../BookEdition';
import { Card, Modal, Button, Image, Header} from 'semantic-ui-react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import DeleteBook from '../DeleteBook';
const BookCard = ({ book, favorites, handleShowClose, removeBook }) => {
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
          {imgURL && <Image floated="right" size="tiny" src={imgURL} />}
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{author}</Card.Meta>
          <Card.Meta>{year}</Card.Meta>
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
            <AddFavorites book={book} favorites={favorites}></AddFavorites>
            <BookEdition book={book} favorites={favorites} handleShowClose={handleShowClose}></BookEdition>
          </Modal>
        </Card.Content>
      </Card>
    </>
  );
};

export default BookCard;
