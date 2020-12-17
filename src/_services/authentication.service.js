import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../_helpers';

const url = 'http://127.0.0.1:3001';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
	login,
	logout,
	currentUser: currentUserSubject.asObservable(),
	get currentUserValue() {
		return currentUserSubject.value;
	},
};

function login(email, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	};

	return fetch(`${url}/auth/login`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			localStorage.setItem('currentUser', JSON.stringify(user));
			console.log('xxx');
			currentUserSubject.next(user);
			return user;
		});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('currentUser');
	currentUserSubject.next(null);
}
