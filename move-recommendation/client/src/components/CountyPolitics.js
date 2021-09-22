import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CountyPoltics extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.countyPolObj.percentDEM}</div>
				<div className="genre">{this.props.countyPolObj.percentGOP}</div>
				
			</div>
			
		);
	}
}
