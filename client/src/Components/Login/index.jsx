import React from 'react';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './Auth';
// import Register from './Register';
// import { Container } from 'semantic-ui-react';



class LoginForm extends React.Component {

	// handleSuccessfulAuth(data) {
		// this.props.handleLog(data);
	// }

	render() {
		return (
			<div>
				<Auth />
			</div>
			// <BrowserRouter>
				/* <Container> */
				  /* <Switch> */
					/* {/* <Route path="/" component={Auth} 	/> */
					/* {/* <Route path="/register" component=	{Register} /> */
				  /* </Switch> */
				/* </Container> */
		  	/* </BrowserRouter> */
		)
	}


};

export default LoginForm;
