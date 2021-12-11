import React from 'react';
import ReactDOM from 'react-dom';

import Grid from './../Grid/Grid.js';
import Button from './../Button/Button';

import cloneArray from '../../functions/cloneArray';
import createNestedArray from '../../functions/createNestedArray';

import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.speed = 1000;
		this.rows = 30;
		this.cols = 50;

		this.state = {
			generation: 0,
			grid: createNestedArray(this.rows, this.cols, false)
		};
	}

	play = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.update, this.speed);
	}

	pause = () => {
		clearInterval(this.intervalId);
	}

	clear = () => {
		var grid = createNestedArray(this.rows, this.cols, false);
		this.setState({
			grid: grid,
			generation: 0
		});
		this.pause();
	}

	seed = () => {
		let newGrid = createNestedArray(this.rows, this.cols, false);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 3) === 1) {
					newGrid[i][j] = true;
				}
			}
		}
		this.setState({ grid: newGrid });
	}

	changeSpeed = (e) => {
		console.log(e.target.value);
		this.speed = 2000 - e.target.value;
		this.play();
	}

	update = () => {
		let g = this.state.grid;
		let g2 = cloneArray(this.state.grid);

		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let count = 0;
				if (i > 0) if (g[i - 1][j]) count++;
				if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
				if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
				if (j < this.cols - 1) if (g[i][j + 1]) count++;
				if (j > 0) if (g[i][j - 1]) count++;
				if (i < this.rows - 1) if (g[i + 1][j]) count++;
				if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
				if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
				if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
				if (!g[i][j] && count === 3) g2[i][j] = true;
			}
		}

		this.setState({
			grid: g2,
			generation: this.state.generation + 1
		});
	}

	toggleCell = (row, col) => {
		let newGrid = cloneArray(this.state.grid);
		newGrid[row][col] = !newGrid[row][col];
		this.setState({ grid: newGrid });
	}

	componentDidMount() {
		this.seed();
	}

	render() {
		return (
			<div className="container">
				<h1>The Game of Life</h1>
				<nav className="menu">
				<Button action={this.play} text={"Play"}/>
				<Button action={this.pause} text={"Pause"}/>
				<Button action={this.clear} text={"Clear"}/>
				<Button action={this.seed} text={"Seed"}/>
				<span>
					<input type="range" name="speed" id="speed" max="1900" min="0" defaultValue="1000" onChange={(e) => this.changeSpeed(e)}></input>
					<label htmlFor="speed">Speed</label>
				</span>
				</nav>
				<Grid
					grid={this.state.grid}
					cols={this.cols}
					rows={this.rows}
					toggleCell={this.toggleCell}
				/>
				<h3>Generations: {this.state.generation}</h3>
				<p>Rules:</p>
				<blockquote cite="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
					<ol>
						<li>Any live cell with two or three live neighbours survives.</li>
						<li>Any dead cell with three live neighbours becomes a live cell.</li>
						<li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>

					</ol>
					<cite><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">- "Conway's Game of Life", Wikipedia</a></cite>
				</blockquote>
			</div>
		);
	}
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));