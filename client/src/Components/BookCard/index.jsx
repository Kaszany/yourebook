import React from 'react';
import { Card, Modal, Button, Image, Header, ModalActions } from 'semantic-ui-react';
import axios from 'axios';

const BookCard = ({ book }) => {
  const { title, author, genre, year, imgURL} = book;

  const handleDownload = () => {
    axios({
      method: 'get',
      url: `/api/PDFs.files/${book.PDF}`,
      responseType: 'blob',
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'testpdf');
      document.body.appendChild(link);
      link.click();
    }).catch(err => {
      if(err.response) {console.log(err.response);
      } else if (err.request) {
        console.log(err.request)
      }
    }) ;
  };

  return (
    <>
      <Card color="blue" key={book._id}>
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
          </Modal>
        </Card.Content>
      </Card>
    </>
  );
};

export default BookCard;
