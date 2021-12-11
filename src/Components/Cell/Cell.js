import React, { Component } from 'react';

export default class Cell extends Component {

	render() {
		return (
			<div
				className={`cell ${this.props.isAlive ? 'cell--on' : 'cell--off'}`}
				id={this.props.id}
				onClick={() => this.props.toggleCell(this.props.row, this.props.col)}
			>
			</div>
		);
	}
}
