import React from 'react';
import './style.css';
import RecentPosts from './RecentPosts';

import Layout from '../../components/Layout';

const Home = (props) => {
	return (
		<div>
			<Layout>
				<RecentPosts style={{ width: '70%' }} />
			</Layout>
		</div>
	);
};

export default Home;
