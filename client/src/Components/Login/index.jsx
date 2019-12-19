import React from 'react';
import Auth from './Auth';

class LoginForm extends React.Component {

	render() {
		return (
			<div className="ui container" style={{marginTop: '50px'}}>
				<Auth />
			</div>
		)
	}
};

export default LoginForm;
