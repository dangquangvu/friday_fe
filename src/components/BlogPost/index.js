import React, { useState, useEffect } from 'react';
import './style.css';
import Card from '../UI/Card';
import blogPost from '../../data/blog.json';
import { userService } from '../../_services/user.service';
/**
 * @author
 * @function BlogPost
 **/

const BlogPost = (props) => {
	const [post, setPost] = useState({
		id: '',
		blogCategory: '',
		blogTitle: '',
		createdAt: '',
		author: '',
		blogImage: '',
		blogText: '',
	});
	const [slug, setSlug] = useState('');

	useEffect(() => {
		const slug = props.match.params.id;
		console.log(slug);
		userService.blogDetails(slug).then((data) => {
			data.map((item) => {
				setPost(item);
			});
		});

		setSlug(slug);
	}, [post, props.match.params.slug]);

	if (post.blogImage === '') return null;

	return (
		<div className="blogPostContainer">
			<Card>
				<div className="blogHeader">
					<span className="blogCategory">{post.blogCategory}</span>
					<h1 className="postTitle">{post.blogTitle}</h1>
					<span className="postedBy">
						posted on {post.postedOn} by {post.author}
					</span>
				</div>

				<div className="postImageContainer">
					<img src={require('../../blogPostImages/' + post.blogImage)} alt="Post Image" />
				</div>

				<div className="postContent">
					<h3>{post.blogTitle}</h3>
					<p>{post.blogText}</p>
				</div>
			</Card>
		</div>
	);
};

export default BlogPost;
