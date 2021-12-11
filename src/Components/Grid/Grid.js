import React, { Component } from 'react';

import Cell from '../Cell/Cell';

export default class Grid extends Component {
	render() {
		const width = this.props.cols * 14;
		const rowsArr = [];

		for (let i = 0; i < this.props.rows; i++) {
			for (let j = 0; j < this.props.cols; j++) {
				let id = i + '_' + j;
				rowsArr.push(
					<Cell
						isAlive={this.props.grid[i][j]}
						key={id}
						id={id}
						row={i}
						col={j}
						toggleCell={this.props.toggleCell}
					/>
				);
			}
		}
		return (
			<div className='grid' style={{ width: width, }}>
				{rowsArr}
			</div>
		);
	}
}
