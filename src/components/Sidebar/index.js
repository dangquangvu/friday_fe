import React, { useState, useEffect } from 'react';
import './style.css';
import Card from '../UI/Card';
import blogPost from '../../data/blog.json';
import { NavLink } from 'react-router-dom';
import { authenticationService } from '../../_services';
import { Alert, FormGroup, Button, Form } from 'react-bootstrap';
import { history } from '../../_helpers';
import { userService } from '../../_services/user.service';
/**
 * @author
 * @function Sidebar
 **/

const Sidebar = (props) => {
	const store = authenticationService.currentUserValue;
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

	const redirectCreate = () => {
		history.push('/create');
		window.location.reload();
	};

	return (
		<div
			className="sidebarContainer"
			style={{
				width: props.width,
			}}
		>
			{store && (
				<>
					<Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>
						<div className="cardHeader">
							<span>About Me</span>
						</div>
						<div className="profileImageContainer">
							<img src={require('../../assets/images.png')} alt="" />
						</div>
						<div className="cardBody">
							<div className="personalBio">
								<p>name: {store ? store.fullName : ''}</p>
								<p>email: {store ? store.email : ''}</p>
							</div>
						</div>
						<Button variant="outline-info" onClick={redirectCreate}>
							Create Blog
						</Button>
					</Card>
				</>
			)}

			<Card style={{ marginBottom: '20px', padding: '20px', boxSizing: 'border-box' }}>
				<div className="cardHeader">
					<span>Recent Posts</span>
				</div>

				<div className="recentPosts">
					{posts.map((post) => {
						return (
							<NavLink key={post._id} to={`/post/${post.slug}`}>
								<div className="recentPost">
									<h3>{post.blogTitle}</h3>
									<span>{post.createdAt}</span>
								</div>
							</NavLink>
						);
					})}
				</div>
			</Card>
		</div>
	);
};

export default Sidebar;
