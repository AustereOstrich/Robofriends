import React, { Component } from 'react';
import CardList from '../Components/CardList';
import { robots } from '../robots';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './App.css';
import ErrorBoundary from '../Components/ErrorBoundary';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchField: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		this.setState({searchField: event.target.value})
	}

	render() {
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
		});
		if (this.state.robots.length == 0) {
			return <h1>Loading...</h1>
		} else {
			return (
				<div className='tc'>
					<h1>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundary>
							<CardList robots={filteredRobots}/>
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
	};
};

export default App;