import React from 'react';
import './style.css';
import Sidebar from '../Sidebar';

/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
	return (
		<React.Fragment>
			<div className="container">
				{props.children}
				<Sidebar />
			</div>
			<div>
				<h3>blog made by me</h3>
			</div>
		</React.Fragment>
	);
};

export default Layout;
