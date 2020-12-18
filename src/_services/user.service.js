import { authHeader, handleResponse } from '../_helpers';
import { authenticationService } from './authentication.service';
export * from './authentication.service';
const url = 'http://127.0.0.1:3001';
const currentUser = authenticationService.currentUserValue;
export const userService = {
	getUser,
	indexblogs,
	postBlog,
	blogDetails,
};

function getUser(id) {
	const requestOptions = { method: 'GET', headers: authHeader() };
	return fetch(`${url}/user/${id}/details`, requestOptions).then(handleResponse);
}

function indexblogs() {
	const requestOptions = { method: 'GET', headers: authHeader() };
	return fetch(`${url}/blog`, requestOptions).then(handleResponse);
}

function postBlog(blogTitle, blogImage, slug, blogText) {
	const body = {
		blogTitle: blogTitle,
		blogImage: blogImage,
		blogText: blogText,
		slug: slug,
	};

	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + currentUser.accessToken,
	};
	const requestOptions = { method: 'POST', headers: headers, body: JSON.stringify(body) };
	console.log(requestOptions);
	return fetch(`${url}/blog`, requestOptions).then(handleResponse);
}

function blogDetails(id) {
	const requestOptions = { method: 'GET', headers: authHeader() };
	return fetch(`${url}/blog/${id}`, requestOptions).then(handleResponse);
}
