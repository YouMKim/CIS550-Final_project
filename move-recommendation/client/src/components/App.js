import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import CountyInfo from './CountyInfo';
import CountyInfoSearch from './CountyInfoSearch';
import CountyRecommendations from './CountyRecommendation';


export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/countyrecommendation"
							render={() => (
								<CountyRecommendations />
							)}
						/>
						<Route
							path="/countysummary/:countyFip?"
							render={() => (
								<CountyInfo/>
							)}
						/>
						<Route
							path="/countyinfosearch/:countyFip?"
							render={() => (
								<CountyInfoSearch/>
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}