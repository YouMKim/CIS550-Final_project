import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class TopCountyRows extends React.Component {
	constructor(props) {
		super(props);
	}


	/* returns a row that displays a county's information */
	render() {
		return (
			<div className="county " onClick={event => window.location.href='/countySummary/' + this.props.countyFips}>
				<div className="countyname" >{this.props.countyName}</div>
				<div className="countyfips">{this.props.countyFips}</div>
				<div className="state_id">{this.props.state}</div>
			</div>
		);
	}
}
