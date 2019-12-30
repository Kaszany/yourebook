import React, { Component } from 'react';
import { Form, Input, Button, Modal} from 'semantic-ui-react';
import axios from 'axios';
// import { useFormik } from 'formik';


// basic

class Register extends Component {
    state = { name: '', email: '', password: '', passwordconf: '' };



    onFormChange = e => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };
  
    onFormSubmit = async e => {
      e.preventDefault();
      const { name, email, password, passwordconf} = this.state;
      if (password!==passwordconf) return (alert('confirm password'));

      axios
        .post('/api/users', {
          name: name,
          email: email,
          password: password,
          // passwordconf: passwordconf,
        })
        .then(response => {
          // if (resoponse.data.logged) {
            // // this.props.handleSuccessfulAuth(response.data);
          // }
          console.log(response);
        })
        .catch(error => {
          console.log(`login error ${error}`);
        });
  };

  onRegister = e => {
    e.preventDefault();
    this.props.history.push('/');
  }

    render() {
      return (
        <Modal
        size={'mini'}
        trigger={
          <Button className="orange ui button" onClick={this.handleOpen}>
            Sign up
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
    
        <Modal.Content>        
          <Form onSubmit={this.onFormSubmit} style={{display: 'flex', justifyContent: 'center'}}>
            <div className="ui segment" style={{width: '500px' }}>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{width: '40px'}}><i className="user icon"></i></label>
                <Input placeholder="Name (min. 5 char.)" name="name" value={this.state.name} onChange={this.onFormChange}></Input>
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{width: '40px'}}><i className="at icon"></i></label>
                <Input placeholder="Email" name="email" value={this.state.email} onChange={this.onFormChange}></Input>
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{width: '40px'}}><i className="lock icon"></i></label>
                <Input className="ui labelled input" placeholder="Password (min. 5 char.)" name="password" value={this.state.password} onChange={this.onFormChange} type="password"></Input>
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{width: '40px'}}><i className="check icon"></i></label>
                <Input className="ui labelled input" placeholder="Confirm password" name="passwordconf" value={this.state.passwordconf} onChange={this.onFormChange} type="password"></Input>
              </div>
            </Form.Field>
            
            <div style={{display:'flex', justifyContent:'center'}}>
              <Button className="big orange ui button" type="submit"><i className="edit icon"></i>Sign up</Button>
            </div>
            </div>
            </Form>
            </Modal.Content>
            </Modal> 
        );
      }

}

export default Register;