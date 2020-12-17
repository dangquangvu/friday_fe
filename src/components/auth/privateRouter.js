import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import { authenticationService } from '../../_services';

export default class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { path, Component } = this.props;
		let token = authenticationService.currentUser;
		let hasToken = token ? true : false;
		return (
			<Route
				path={path}
				exact
				render={(props) => (hasToken == true ? <Component {...props} /> : <Redirect to="/login" />)}
			/>
		);
	}
}
