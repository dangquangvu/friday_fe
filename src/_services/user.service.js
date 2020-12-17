import { authHeader, handleResponse } from '../_helpers';

const url = 'http://127.0.0.1:3001';

export const userService = {
	getAll,
};

function getAll() {
	const requestOptions = { method: 'GET', headers: authHeader() };
	return fetch(`${url}/users`, requestOptions).then(handleResponse);
}
