import React, { Component } from 'react';

export default class Buttons extends Component {
	render() {
		return (
				<button onClick={this.props.action}>{this.props.text}</button>
		);
	}
}
