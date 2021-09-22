import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CountyRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.countyStatsObj.totalPopulation}</div>
				<div className="genre">{this.props.countyStatsObj.percentMarried}</div>
				<div className="genre">{this.props.countyStatsObj.bachelorsOrGreater}</div>
				<div className="genre">{this.props.countyStatsObj.medianListingPrice}</div>
				<div className="genre">{this.props.countyStatsObj.medianDaysOnMarket}</div>
				<div className="genre">{this.props.countyStatsObj.medianSquareFeet}</div>
				
			</div>
			
		);
	}
}
