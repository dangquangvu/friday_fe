import React, { useEffect, useState } from 'react';
import './style.css';
import Card from '../../../components/UI/Card';
import blogPost from '../../../data/blog.json';
import { NavLink } from 'react-router-dom';
import { userService } from '../../../_services/user.service';
/**
 * @author
 * @function RecentPosts
 **/

const RecentPosts = (props) => {
	const [blogs, setPost] = useState([]);
	useEffect(
		() =>
			userService.indexblogs().then((blogs) => {
				setPost(blogs);
			}),
		[]
	);

	console.log(blogs, 'xxx');
	const posts = blogs ? blogs : [];
	return (
		<div style={props.style}>
			{posts.map((post) => {
				return (
					<Card style={{ marginBottom: '20px' }}>
						<div className="postImageWrapper">
							<img src={require('../../../blogPostImages/' + post.blogImage)} alt="Post Image" />
						</div>

						<div style={{ textAlign: 'center' }}>
							<span>{post.blogCategory}</span>
							<NavLink key={post.id} to={`/post/${post.slug}`}>
								<h2>{post.blogTitle}</h2>
							</NavLink>
							<span>
								posted on {post.createdAt} by {post.author}
							</span>
							<p>{post.blogText}</p>
						</div>
						{/* <button>Read More</button>
							<div className="recentPost">
								<h3>{post.blogTitle}</h3>
								<span>{post.postedOn}</span>
							</div> */}
					</Card>
				);
			})}
		</div>
	);
};

export default RecentPosts;
