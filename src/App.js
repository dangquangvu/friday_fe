import React from 'react';
import './App.css';
import Home from './containers/Home';
// import Header from './components/Header';
// import Hero from './components/Hero';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Post from './containers/Post';
import Login from './components/auth/login';
import CreateBlog from './components/Blog/createBlog';
function App() {
	return (
		<Router>
			<div className="App">
				<Route path="/" exact component={Home} />
				<Route path="/post/:slug" component={Post} />
				<Route path="/login" component={Login} />
				<Route path="/create" component={CreateBlog} />
			</div>
		</Router>
	);
}

export default App;
