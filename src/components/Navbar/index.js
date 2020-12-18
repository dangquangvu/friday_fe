import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import { Button, Dropdown, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { authenticationService } from '../../_services';
import { history } from '../../_helpers';
import { userService } from '../../_services/user.service';
/**
 * @author
 * @function Navbar
 **/

const Navbar = (props) => {
	const [search, setSearch] = useState(false);
	const [access, setAccess] = useState(false);
	const store = authenticationService.currentUserValue;
	console.log(store);
	const [me, setMe] = useState({});
	useEffect(() => {
		if (store) {
			setAccess(true);
		}
	}, store);
	const submitSearch = (e) => {
		e.preventDefault();
		alert('Searhed');
	};

	const openSearch = () => {
		setSearch(true);
	};
	const logout = () => {
		authenticationService.logout();
		history.push('/');
		window.location.reload();
	};
	const redirectLogin = () => {
		history.push('/login');
		window.location.reload();
	};
	const searchClass = search ? 'searchInput active' : 'searchInput';
	console.log(authenticationService.currentUser);
	return (
		<div className="navbar">
			<ul className="navbarMenu">
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				{/* <li>
					<NavLink to="/post">Posts</NavLink>
				</li> */}
			</ul>

			<div className="search">
				<ul>
					<li>
						<form onSubmit={submitSearch}>
							<input type="text" className={searchClass} placeholder="Search" />
							<img
								onClick={openSearch}
								className="searchIcon"
								src={require('../../assets/icons/search.png')}
								alt="Search"
							/>
						</form>
					</li>
					<li>
						{/* <LoginPage /> */}
						{access ? (
							<Dropdown>
								<Dropdown.Toggle variant="outline-info" id="dropdown-basic">
									<FontAwesomeIcon icon={faUserCircle} />
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={logout}>logout</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						) : (
							<Button variant="outline-info" onClick={redirectLogin}>
								login
							</Button>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
