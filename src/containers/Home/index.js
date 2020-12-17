import React from 'react';
import './style.css';
import RecentPosts from './RecentPosts';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Layout from '../../components/Layout';

const Home = (props) => {
	return (
		<div>
			<Header />
			<Hero />
			<Layout>
				<RecentPosts style={{ width: '70%' }} />
			</Layout>
		</div>
	);
};

export default Home;
