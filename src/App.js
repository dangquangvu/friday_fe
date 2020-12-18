import React from 'react';
import './App.css';
import Home from './containers/Home';
// import Header from './components/Header';
// import Hero from './components/Hero';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Post from './containers/Post';
import Login from './components/auth/login';
import CreatePage from './components/Blog/createPage';
import PrivateRoute from '../src/components/auth/privateRouter';
function App() {
	return (
		<Router>
			<div className="App">
				<Route path="/" exact component={Home} />
				<Route path="/post/:id" component={Post} />
				<PrivateRoute path="/create" Component={CreatePage} />
				<Route path="/login" component={Login} />
			</div>
		</Router>
	);
}
//history={history}
export default App;
