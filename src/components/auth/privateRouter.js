import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../../_services';

export default class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { path, Component } = this.props;
		const currentUser = authenticationService.currentUserValue;
		console.log(currentUser);
		return <Route path={path} exact render={(props) => <Component {...props} />} />;
	}
}

// render() {
// 		const { path, Component } = this.props;
// 		const currentUser = authenticationService.currentUserValue;
// 		console.log(currentUser);
// 		return (
// 			<Route
// 				path={path}
// 				exact
// 				render={(props) => (currentUser ? <Component {...props} /> : <Redirect to="/login" />)}
// 			/>
// 		);
// 	}
