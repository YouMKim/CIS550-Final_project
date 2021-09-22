import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CountyEcon extends React.Component {
	constructor(props) {
		super(props);
	}

	//Remote push test
	
	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.countyEconObj.mean_household_wages}</div>
				<div className="genre">{this.props.countyEconObj.income_inequality_index}</div>
				<div className="genre">{this.props.countyEconObj.percent_below_poverty}</div>
				<div className="genre">{this.props.countyEconObj.median_household_income}</div>
			</div>
			
		);
	}
}


