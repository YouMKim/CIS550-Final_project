import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CountyName extends React.Component {
	constructor(props) {
		super(props);
	}

	//Remote push test
	
	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.countyNameObj.countyName}</div>
			</div>
			
		);
	}
}


