import React, { Component } from 'react';
import { Alert, FormGroup, Button, Form } from 'react-bootstrap';
import './index.css';
import { isEmpty, isContainWhiteSpace } from '../auth/validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authenticationService } from '../../_services';
import { history } from '../../_helpers';
import Card from '../UI/Card';
import { userService } from '../../_services/user.service';
class CreateBlog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formDataBlog: {}, // Contains login form data
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
		let { formDataBlog } = this.state;
		formDataBlog[name] = value;
		console.log(formDataBlog);
		this.setState({
			formDataBlog: formDataBlog,
		});
	};

	validateLoginForm = (e) => {
		let errors = {};
		const { formDataBlog } = this.state;

		if (isEmpty(formDataBlog.title)) {
			errors.title = "Title can't be blank";
		}

		if (isEmpty(formDataBlog.slug)) {
			errors.slug = "Slug can't be blank";
		} else if (isContainWhiteSpace(formDataBlog.slug)) {
			errors.slug = 'slug should not contain white spaces';
		}
		if (isEmpty(formDataBlog.image)) {
			errors.image = "Image field can't be blank";
		} else if (isContainWhiteSpace(formDataBlog.image)) {
			errors.image = 'image should not contain white spaces';
		}
		if (isEmpty(formDataBlog.content)) {
			errors.content = "Content can't be blank";
		}

		console.log(errors);
		if (isEmpty(errors)) {
			return true;
		} else {
			return errors;
		}
	};

	createBlog = async (e) => {
		e.preventDefault();

		let errors = this.validateLoginForm();

		if (errors === true) {
			let { formDataBlog } = this.state;
			console.log(formDataBlog);
			await userService
				.postBlog(formDataBlog.title, formDataBlog.image, formDataBlog.slug, formDataBlog.content)
				.then((data) => {
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
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
			<Card className="mr_top color">
				<Form onSubmit={this.createBlog} className="form">
					<FormGroup
						controlId="title"
						validationState={formSubmitted ? (errors.title ? 'error' : 'success') : null}
					>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							name="title"
							placeholder="Blog title"
							onChange={this.handleInputChange}
							aria-describedby="titleHelpBlock"
						/>
						{errors.title && (
							<Form.Text className="background" id="titleHelpBlock">
								{errors.title}
							</Form.Text>
						)}
					</FormGroup>
					<FormGroup
						controlId="slug"
						validationState={formSubmitted ? (errors.slug ? 'error' : 'success') : null}
					>
						<Form.Label>Slug</Form.Label>
						<Form.Control
							type="text"
							name="slug"
							placeholder="Blog slug"
							onChange={this.handleInputChange}
							aria-describedby="slugHelpBlock"
						/>
						{errors.slug && (
							<Form.Text className="background" id="slugHelpBlock">
								{errors.slug}
							</Form.Text>
						)}
					</FormGroup>
					<FormGroup
						controlId="image"
						validationState={formSubmitted ? (errors.image ? 'error' : 'success') : null}
					>
						<Form.Label>Image</Form.Label>
						<Form.Control
							type="text"
							name="image"
							placeholder="Blog image"
							onChange={this.handleInputChange}
							aria-describedby="imageHelpBlock"
						/>
						{errors.image && (
							<Form.Text className="background" id="imageHelpBlock">
								{errors.image}
							</Form.Text>
						)}
					</FormGroup>
					<Form.Group
						controlId="content"
						validationState={formSubmitted ? (errors.content ? 'error' : 'success') : null}
					>
						<Form.Label>Content</Form.Label>
						<Form.Control
							as="textarea"
							name="content"
							onChange={this.handleInputChange}
							rows={3}
							aria-describedby="contentHelpBlock"
						/>
						{errors.content && (
							<Form.Text className="background" id="contentHelpBlock">
								{errors.content}
							</Form.Text>
						)}
					</Form.Group>
					<Button type="submit" bsStyle="primary" className="mar_bot">
						Create
					</Button>
					{loginFalse && (
						<Alert key="loginfalse" variant="danger">
							Create blog false!
						</Alert>
					)}
				</Form>
			</Card>
		);
	}
}

export default CreateBlog;
