import React from 'react';
import Auth from './Auth';
// import Register from './Register';

class LoginForm extends React.Component {
    render() {
        return (
            // <div className="ui container" style={{marginTop:'50px'}}>
            //     <Auth />
            // </div>
            <div className="ui container" style={{marginRight: '14px'}}>
            <Auth />
        </div>
        )
    }
};

export default LoginForm;


