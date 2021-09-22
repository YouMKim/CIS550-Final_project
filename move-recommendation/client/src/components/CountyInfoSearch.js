import React from 'react';
import PageNavbar from './PageNavbar';
import CountyRow from './CountyRow';
import '../style/CountyInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountyPoltics from './CountyPolitics';
import StateCovid from './StateCovid';
import CountyWeather from './CountyWeather';
import CountyEcon from './CountyEcon';
import CountyZipStats from './CountyZipStats';
import { useParams } from 'react-router-dom';



export default class CountyInfo extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			selectedCounty: "",
			counties: [],
			countystats: [],
			countypol: [],
			statecovid: [],
			countyweather: [],
			countyecon: [],
			countyzipstats: []
		};

		this.submitCounty = this.submitCounty.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/counties",
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				// Convert the response data to a JSON.
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(countyList => {
				if (!countyList) return;
				// Map each genreObj in genreList to an HTML element:
				// A button which triggers the showMovies function for each genre.
				let countyDivs = countyList.map((countyObj, i) =>
					<option value={countyObj.countyFips} id={"county-" + countyObj.countyName}>{countyObj.countyName}</option>
				);
				// Set the state of the genres list to the value returned by the HTTP response from the server.

				this.setState({
					counties: countyDivs

				});

			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
		console.log("location", this.props.match)


	}

	handleChange(e) {
		this.setState({
			selectedCounty: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitCounty() {
		console.log(this.state.selectedCounty);
		fetch("http://localhost:8081/countysummary/" + this.state.selectedCounty,
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				console.log(res)
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(countystats => {
				if (!countystats) return;
				// Map each genreObj in genreList to an HTML element:
				// A button which triggers the showMovies function for each genre.
				let countyStatsDivs = countystats.map((countyStatsObj, i) =>
					<CountyRow countyStatsObj={countyStatsObj} />
				);
				let countyPolDivs = countystats.map((countyPolObj, i) =>
					<CountyPoltics countyPolObj={countyPolObj} />
				);
				this.setState({
					countystats: countyStatsDivs,
					countypol: countyPolDivs
				});
			});
		fetch("http://localhost:8081/statecovid/countysummary/" + this.state.selectedCounty,
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				console.log(res)
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(statecovid => {
				if (!statecovid) return;
				let stateCovidDivs = statecovid.map((stateCovidObj, i) =>
					<StateCovid stateCovidObj={stateCovidObj} />
				);
				this.setState({
					statecovid: stateCovidDivs
				});
			});
		fetch("http://localhost:8081/countyweather/countysummary/" + this.state.selectedCounty,
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				console.log(res)
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(countyweather => {
				if (!countyweather) return;
				let countyWeatherDivs = countyweather.map((countyWeatherObj, i) =>
					<CountyWeather countyWeatherObj={countyWeatherObj} />
				);
				this.setState({
					countyweather: countyWeatherDivs
				});
			});

		fetch("http://localhost:8081/countyecon/countysummary/" + this.state.selectedCounty,
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				console.log(res)
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(countyecon => {
				if (!countyecon) return;
				let countyEconDivs = countyecon.map((countyEconObj, i) =>
					<CountyEcon countyEconObj={countyEconObj} />
				);
				this.setState({
					countyecon: countyEconDivs
				});
			});
		fetch("http://localhost:8081/countyzipstats/countysummary/" + this.state.selectedCounty,
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				console.log(res)
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(countyzipstats => {
				if (!countyzipstats) return;
				let countyZipStatsDivs = countyzipstats.map((countyZipStatsObj, i) =>
					<CountyZipStats countyZipStatsObj={countyZipStatsObj} />
				);
				this.setState({
					countyzipstats: countyZipStatsDivs
				});
			});
	}

	render() {

		return (
			<div className="CountyInfo">
				<PageNavbar active="countysummary" />

				<div className="container bestgenres-container">
					<div className="jumbotron">
						<div className="h5">County Summary</div>
						<div className="p">This page provides details on a specifically selected county. Below you will see data in the following categories: Covid-19 Statistics, Demograpchic, Real Estate, 2020 Presidential Election Results, Economic and Weather Data</div>

						<div className="years-container">
							<div className="dropdown-container">
								<select value={this.state.selectedCounty} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
									<option select value> -- select an option -- </option>
									{this.state.counties}
								</select>
								<button className="submit-btn" id="countySubmitBtn" onClick={this.submitCounty}>Submit</button>
							</div>
						</div>
					</div>
					{<div className="jumbotron">
						<div className="h5">Latest State COVID-19 Statistics </div>
						<div className="movies-container">
							<div className="movie">
								<div className="head"><strong>State</strong></div>
								<div className="head"><strong>Mortatlity</strong></div>
								<div className="head"><strong>TestingRate</strong></div>
								<div className="head"><strong>ICU Usage</strong></div>
								<div className="head"><strong>Hospitalized</strong></div>


							</div>
							<div className="movies-container" id="results">
								{this.state.statecovid}
							</div>
						</div>
					</div>}
					
					{<div className="jumbotron">
					<div className="h5">Demograpchic and Real Estate Data </div>
						<div className="movies-container">
							<div className="movie">
								<div className="head"><strong>Population</strong></div>
								<div className="head"><strong>%Married</strong></div>
								<div className="head"><strong>%Bachelors</strong></div>
								<div className="head"><strong>HomePrice</strong></div>
								<div className="head"><strong>DaystoSell</strong></div>
								<div className="head"><strong>HomeSize</strong></div>
							</div>
							<div className="movies-container" id="results">
								{this.state.countystats}
							</div>
						</div>
					</div>}
					{<div className="jumbotron">
						<div className="h5">2020 Presidential Election Vote By Percentage </div>

						<div className="movies-container">
							<div className="movie">
								<div className="head"><strong>Democatic Votes</strong></div>
								<div className="head"><strong>Republican Votes</strong></div>

							</div>
							<div className="movies-container" id="results">
								{this.state.countypol}
							</div>
						</div>
					</div>}

					{<div className="jumbotron">
						<div className="movies-container">
							<div className="h5">Monthly Weather Overview </div>

							<div className="movie">
								<div className="head"><strong>Month</strong></div>
								<div className="head"><strong>Average Temp</strong></div>
								<div className="head"><strong>Max Temp</strong></div>
								<div className="head"><strong>Min Temp</strong></div>

							</div>
							<div className="movies-container" id="results">
								{this.state.countyweather}
							</div>
						</div>
					</div>}

					{<div className="jumbotron">
						<div className="h5">Economic Indicators </div>

						<div className="movies-container">
							<div className="movie">
								<div className="head"><strong>Median Household Wages </strong></div>
								<div className="head"><strong>Income Inequality Index</strong></div>
								<div className="head"><strong>Percent Below Poverty</strong></div>
								<div className="head"><strong>Median Household Income</strong></div>

							</div>
							<div className="movies-container" id="results">
								{this.state.countyecon}
							</div>
						</div>
					</div>}


					{<div className="jumbotron">
						<div className="h5">Demographic Breakdown by Zip Codes in County </div>

						<div className="movies-container">
							<div className="movie">
								<div className="head"><strong>Zip Code </strong></div>
								<div className="head"><strong>% Bachelors  </strong></div>
								<div className="head"><strong>% Female w/Bachelors</strong></div>
								<div className="head"><strong>% Male w/Bachelors</strong></div>
								<div className="head"><strong>% Married  </strong></div>
								<div className="head"><strong>%Female Married Age 20-34</strong></div>
								<div className="head"><strong> % Males Married Age 20-34</strong></div>
							</div>
							<div className="movies-container" id="results">
								{this.state.countyzipstats}
							</div>
						</div>
					</div>}

				</div>
			</div>
		);
	}
}
