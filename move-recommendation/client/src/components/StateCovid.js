import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class StateCovid extends React.Component {
 	constructor(props) {
 		super(props);
 	}

 	render() {
 		return (
 			<div className="movieResults">
 				<div className="genre">{this.props.stateCovidObj.state_id}</div>
 				<div className="genre">{this.props.stateCovidObj.mortality}</div>
                 <div className="genre">{this.props.stateCovidObj.testing_rate}</div>
                 <div className="genre">{this.props.stateCovidObj.icu_usage}</div>
 				<div className="genre">{this.props.stateCovidObj.hospitalized_num}</div>
 			</div>
			
 		);
 	}
 }
