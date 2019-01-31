import React, { Component } from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(respone => respone.json())
            .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }

    render(){
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })

        return !robots.length ?
            <h2 className="tc">Loading</h2> :
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <Cardlist robots={filteredRobots}/>
                </Scroll>
            </div>
        ;
    }
}

export default App;