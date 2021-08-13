import React, { Component } from 'react';

import './Box.css';

export default class Box extends Component {

	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col);
	}

	render() {
		return (
			<div
				styleName={this.props.boxClass}
				id={this.props.id}
				onClick={this.selectBox}
			>

			</div>
		);
	}
}
