import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CountyZipStats extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
            	<div className="genre">{this.props.countyZipStatsObj.zip}</div>
				<div className="genre">{this.props.countyZipStatsObj.allbachelors}</div>
				<div className="genre">{this.props.countyZipStatsObj.femalebachelors}</div>
				<div className="genre">{this.props.countyZipStatsObj.malebachelors}</div>
				<div className="genre">{this.props.countyZipStatsObj.allAgesMarried}</div>
				<div className="genre">{this.props.countyZipStatsObj.youngfemalesmarried}</div>
                <div className="genre">{this.props.countyZipStatsObj.youngmalesmarried}</div>
			</div>
			
		);
	}
}
