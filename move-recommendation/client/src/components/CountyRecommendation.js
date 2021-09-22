import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopCountyRows from './TopCountyRows';

export default class CountyRecommendation extends React.Component {
	constructor(props) {
          
		super(props);
		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
            minWage: 0,
            minIncome: 0,   
            meanHousePrice: 999999999,
            housingAllowance: 0, 
            polParam: '%21%3D',
            popParam: "totalPopulation&>=0",
            weatherParam :"HAVING&avg(mtlyTMax)>=0",
            eduParam: 0,


            recDisplay: []
		};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setEducationPref = this.setEducationPref.bind(this);
        this.setRepubPref = this.setRepubPref(this);
        this.setDemPref = this.setDemPref(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPopHigh = this.setPopHigh.bind(this);
        this.setPopMid = this.setPopMid.bind(this);
        this.setPopLow = this.setPopLow.bind(this);
        this.setWeatherCold = this.setWeatherCold.bind(this);
        this.setWeatherMild = this.setWeatherMild.bind(this);
        this.setWeatherWarm = this.setWeatherWarm.bind(this);

 
	}

    //Function for setting the value of the buttons


    handleSubmit(e) {
        console.log(this.state);
        alert('Calculating your Recommendations' );
        fetch("http://localhost:8081/getCountyRecommendations/" + this.state.minWage + "/" + this.state.minIncome + "/" + this.state.meanHousePrice + "/" + this.state.housingAllowance + "/" + this.state.polParam + "/" + this.state.eduParam  + "/" + this.state.popParam + "/" + this.state.weatherParam,
        {
            method: 'GET' // The type of HTTP request.
        }).then(res => {
            console.log(res)
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(countyList => {
            if (!countyList) return;
            let countyDivs = countyList.map((countyObj, i) =>
            <TopCountyRows id={"county-" + countyObj.countyName} countyName={countyObj.countyName} countyFips={countyObj.countyFips} state={countyObj.state_id}/>
            );
            this.setState({
                recDisplay: countyDivs
            });
        });
    }


    handleInputChange(e){
        const target = e.target;
        const name = target.name;
        this.setState({
            [name]:e.target.value
        });
    }
    
    setDemPref(e){
        this.setState({polParam: '%3C'});
    }
    setRepubPref(e){
        this.setState({polParam: '%3E'});
    }

    setPopHigh(e){
        this.setState({popParam: 'totalPopulation>500000'});
    }

    setPopMid(e){
        this.setState({popParam: 'totalPopulation>100000&AND&totalPopulation<=500000'});
    }

    setPopLow(e){
        this.setState({popParam: 'totalPopulation<=100000'});
    }

    setWeatherWarm(e){
        this.setState({weatherParam: 'HAVING&avg(mtlyTMax)>=75&OR&avg(mtlyTAvg)>=65'});
    }

    setWeatherMild(e){
        this.setState({weatherParam: 'HAVING&avg(mtlyTMax)>51&AND&avg(mtlyTMax)<75&AND&avg(mtlyTAvg)>41&AND&avg(mtlyTAvg)<65'});
    }

    setWeatherCold(e){
        this.setState({weatherParam: 'HAVING&avg(mtlyTMax)<=51&OR&avg(mtlyTAvg)<=41'});
    }

    setEducationPref(e){
        this.setState({eduParam: 31.5});
    }



    //Function for displaying the ranked counties 

	render() {
		return (
			<div className="Recommanded County">
				<PageNavbar active="countyrecommendation" />
			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		<div className="h5">Set your Recommendations Parameters - leave blank for default values</div>
			    		<br></br>
                        <form>

			    		<div>
                            <label>
                                Minimum Mean Wage Required :
                            </label>
			    			<input name = "minWage" type='text' placeholder="Minimum Wage Required" value={this.state.minWage} onChange={this.handleInputChange} />
			    		</div>
                        <div>
                            <label>
                                Minimum Income Requirement :
                            </label>
			    			<input name = "minIncome" type='text' placeholder="Median Income Required" value={this.state.minIncome} onChange={this.handleInputChange}  />
			    		</div>
                        

                        <div>
                            <label>
                                Desired House Price:
                            </label>
			    			<input name = "meanHousePrice" type='text' placeholder="Mean House Price" value={this.state.meanHousePrice} onChange={this.handleInputChange}  />
			    		</div>
                        <div>
                            <label>
                                Housing Buget Allowance:
                            </label>
                            <input name = "housingAllowance" type='text' placeholder="Budget Allowance" value={this.state.housingAllowance} onChange={this.handleInputChange}  />
			    		</div>
                        </form>
                        <div>
                             <label>
                                Population Preference :
                            </label>
                            <button onClick ={this.setPopHigh}>High Population</button>
                            <button onClick ={this.setPopMid}>Medium Population</button>
                            <button onClick ={this.setPopLow}>Low Population</button>
                            <button>No Preference</button>
                        </div>
                    
                        <div>
                            <label>
                                Weather Preference :
                            </label>
                            <button onClick ={this.setWeatherWarm}>Warmer Weather</button>
                            <button onClick ={this.setWeatherMild}>Mild Weather</button>
                            <button onClick ={this.setWeatherCold}>Colder Weather</button>
                            <button>No Preference</button>
                        </div>
                    
                        <div>
                            <label>
                                Education Preference :
                            </label>
                            <button onClick ={this.setEducationPref}>High Education levels</button>
                            <button>No preference</button>
                        </div>

                        <div>
                            <label>
                                Political Preference :
                            </label>
                            <button onClick ={this.setDemPref}>Lean Democrat</button>
                            <button onClick ={this.setRepubPref}>Lean Republican</button>
                            <button>No Preference</button>
                        </div>

                        
                        <div>
                            <button type = "button" class = "block" onClick = {this.handleSubmit}> Get your Recommendations</button>
                        </div>
			    	</div>
			    </div>


                <br></br>
                <div className="jumbotron">
                    <div className="movies-container">
                    <div className="county-header">
                        <div className="header-lg"><strong>County Name</strong></div>
                        <div className="header"><strong>County Fips</strong></div>
                        <div className="header"><strong>State</strong></div>
                    </div>
                    <div className="results-container" id="results">

                        {this.state.recDisplay}
                    </div>
                    </div>
                </div>
                        

		    </div>
		);
	}
}