import React from 'react';
import Register from './Register';

class RegisterForm extends React.Component {
    render() {
        return (
            // <div className="ui container" style={{marginTop:'50px'}}>
            //     <Auth />
            // </div>
            <div className="ui container" style={{marginLeft: '14px'}}>
            <Register />
        </div>
        )
    }
};

export default RegisterForm;