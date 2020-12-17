import React, { Component } from 'react';
import { Alert, FormGroup, Button, Form } from 'react-bootstrap';
import './login.css';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from './validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authenticationService } from '../../_services';
import { history } from '../../_helpers';
class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {}, // Contains login form data
			errors: {}, // Contains login field errors
			formSubmitted: false, // Indicates submit status of login form
			loading: false, // Indicates in progress state of login form
			loginFalse: false,
		};
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let { formData } = this.state;
		formData[name] = value;
		this.setState({
			formData: formData,
		});
	};

	validateLoginForm = (e) => {
		let errors = {};
		const { formData } = this.state;

		if (isEmpty(formData.email)) {
			errors.email = "Email can't be blank";
		} else if (!isEmail(formData.email)) {
			errors.email = 'Please enter a valid email';
		}

		if (isEmpty(formData.password)) {
			errors.password = "Password can't be blank";
		} else if (isContainWhiteSpace(formData.password)) {
			errors.password = 'Password should not contain white spaces';
		} else if (!isLength(formData.password, { gte: 5, lte: 16, trim: true })) {
			errors.password = "Password's length must between 6 to 16";
		}

		if (isEmpty(errors)) {
			return true;
		} else {
			return errors;
		}
	};

	login = (e) => {
		e.preventDefault();

		let errors = this.validateLoginForm();

		if (errors === true) {
			let { formData } = this.state;
			console.log(formData);
			authenticationService
				.login(formData.email, formData.password)
				.then(() => {
					this.setState({
						loginFalse: false,
					});
					history.push('/');
					window.location.reload();
				})
				.catch((err) => {
					console.log(err);
					this.setState({
						loginFalse: true,
					});
				});
		} else {
			this.setState({
				errors: errors,
				formSubmitted: true,
				// loginFalse: false,
			});
		}
	};

	render() {
		const { errors, formSubmitted, loginFalse } = this.state;

		return (
			<div className="Login">
				<h1>Login</h1>
				{/* <Row> */}
				<Form onSubmit={this.login}>
					<FormGroup
						controlId="email"
						validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}
					>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="text"
							name="email"
							placeholder="Enter your email"
							onChange={this.handleInputChange}
							aria-describedby="emailHelpBlock"
						/>
						{errors.email && (
							<Form.Text className="background" id="emailHelpBlock">
								{errors.email}
							</Form.Text>
						)}
					</FormGroup>
					<FormGroup
						controlId="password"
						validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}
					>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Enter your password"
							onChange={this.handleInputChange}
							aria-describedby="passHelpBlock"
						/>
						{errors.password && (
							<Form.Text className="background" id="emailHelpBlock">
								{errors.password}
							</Form.Text>
						)}
					</FormGroup>
					<Button type="submit" bsStyle="primary" className="mar_bot">
						Sign-In
					</Button>
					{/* <Button bsStyle="primary" className="mar_left">
						register
					</Button> */}
					{loginFalse && (
						<Alert key="loginfalse" variant="danger">
							login false!
						</Alert>
					)}
				</Form>
				{/* </Row> */}
			</div>
		);
	}
}

export default Login;
