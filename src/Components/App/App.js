import React from 'react';
import ReactDOM from 'react-dom';

import Child from './../Child/Child.js';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			init: 'React here!'
		};
	}

	render() {
		return (
			<div>
				<Child props={this.state.init} />
			</div>
		);
	}
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));