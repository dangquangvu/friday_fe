import React from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import CreateBlog from './createBlog';

const CreatePage = (props) => {
	return (
		<div>
			<Header />
			<Hero />
			<CreateBlog />
		</div>
	);
};

export default CreatePage;
