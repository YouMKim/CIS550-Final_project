import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CountyWeather extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.countyWeatherObj.month}</div>
				<div className="genre">{this.props.countyWeatherObj.mtlyTAvg}</div>
                <div className="genre">{this.props.countyWeatherObj.mtlyTMax}</div>
                <div className="genre">{this.props.countyWeatherObj.mtlyTMin}</div>
			</div>
		);
	}
}
