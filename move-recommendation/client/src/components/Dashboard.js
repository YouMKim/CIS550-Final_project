import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import TopCountyRows from './TopCountyRows';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      countiesAll: [],
      countiesDem: [],
      countiesRep: [],
      countiesWarm: [],
      countiesCold: [],
      countiesHighPop: [],
      countiesSmallTown: [],
      countiesHighEd: [],
      countiesHighWage: [],
      countiesHighIncome: [],
      countiesHighEquality:[],
      countiesDisplay: [],  


      genres: [],
      movies: []
    }

    this.showDemCounties = this.showDemCounties.bind(this);
    this.showRepCounties = this.showRepCounties.bind(this);
    this.showWarmCounties = this.showWarmCounties.bind(this);
    this.showColdCounties = this.showColdCounties.bind(this);
    this.showHighPopCounties = this.showHighPopCounties.bind(this);
    this.showSmallTownCounties = this.showSmallTownCounties.bind(this);
    this.showHighPopCounties = this.showHighPopCounties.bind(this);
    this.showHighIncomeCounties = this.showHighIncomeCounties.bind(this);
    this.showHighWageCounties = this.showHighWageCounties.bind(this);
    this.showHighEqualityCounties = this.showHighEqualityCounties.bind(this);

  }
  //test commit
  // React function that is called when the page load.
  componentDidMount() {



  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies() {
    fetch("http://localhost:8081/counties",
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
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let countyDivs = countyList.map((countyObj, i) =>
      <TopCountyRows id={"county-" + countyObj.countyName} countyName={countyObj.countyName} countyFips={countyObj.countyFips} state={countyObj.state}/>
      );

    this.setState ({
      countiesDisplay: countyDivs
    });

  });
  }

  showDemCounties() {
    fetch("http://localhost:8081/demcounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(demCountyList => {
      if (!demCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let demCountyDivs = demCountyList.map((demCountyObj, i) =>
      <TopCountyRows id={"county-" + demCountyObj.countyName} countyName={demCountyObj.countyName} countyFips={demCountyObj.countyFips} state={demCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: demCountyDivs
    });

  });
  }

  showRepCounties() {
    fetch("http://localhost:8081/repcounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(repCountyList => {
      if (!repCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let repCountyDivs = repCountyList.map((repCountyObj, i) =>
      <TopCountyRows id={"county-" + repCountyObj.countyName} countyName={repCountyObj.countyName} countyFips={repCountyObj.countyFips} state={repCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: repCountyDivs
    });

  });
  }

  showWarmCounties() {
    fetch("http://localhost:8081/warmclimatecounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(warmCountyList => {
      if (!warmCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let warmCountyDivs = warmCountyList.map((warmCountyObj, i) =>
      <TopCountyRows id={"county-" + warmCountyObj.countyName} countyName={warmCountyObj.countyName} countyFips={warmCountyObj.countyFips} state={warmCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: warmCountyDivs

    });

  });
  }

  showColdCounties() {
    fetch("http://localhost:8081/coldclimatecounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(coldCountyList => {
      if (!coldCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let coldCountyDivs = coldCountyList.map((coldCountyObj, i) =>
      <TopCountyRows id={"county-" + coldCountyObj.countyName} countyName={coldCountyObj.countyName} countyFips={coldCountyObj.countyFips} state={coldCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: coldCountyDivs

    });

  });
  }

  showHighPopCounties() {
    fetch("http://localhost:8081/highlypopulatedcounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(highPopCountyList => {
      if (!highPopCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let highPopCountyDivs = highPopCountyList.map((highPopCountyObj, i) =>
      <TopCountyRows id={"county-" + highPopCountyObj.countyName} countyName={highPopCountyObj.countyName} countyFips={highPopCountyObj.countyFips} state={highPopCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: highPopCountyDivs
    });

  });
  }

  showSmallTownCounties() {
    fetch("http://localhost:8081/lowpopulatedcounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(smallTownCountyList => {
      if (!smallTownCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let smallTownCountyDivs = smallTownCountyList.map((smallTownCountyObj, i) =>
      <TopCountyRows id={"county-" + smallTownCountyObj.countyName} countyName={smallTownCountyObj.countyName} countyFips={smallTownCountyObj.countyFips} state={smallTownCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: smallTownCountyDivs
    });

  });
  }

  showHighEducatedCounties() {
    fetch("http://localhost:8081/highlyeducatedcounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(highEdCountyList => {
      if (!highEdCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let highEdCountyDivs = highEdCountyList.map((highEdCountyObj, i) =>
      <TopCountyRows id={"county-" + highEdCountyObj.countyName} countyName={highEdCountyObj.countyName} countyFips={highEdCountyObj.countyFips} state={highEdCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: highEdCountyDivs
    });

  });
  }
  showHighIncomeCounties() {
    fetch("http://localhost:8081/highmedianincomecounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(highIncomeCountyList => {
      if (!highIncomeCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let highIncomeCountyDivs = highIncomeCountyList.map((highIncomeCountyObj, i) =>
      <TopCountyRows id={"county-" + highIncomeCountyObj.countyName} countyName={highIncomeCountyObj.countyName} countyFips={highIncomeCountyObj.countyFips} state={highIncomeCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: highIncomeCountyDivs
    });

  });
  }



  showHighWageCounties() {
    fetch("http://localhost:8081/highwagecounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(highWageCountyList => {
      if (!highWageCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let highWageCountyDivs = highWageCountyList.map((highWageCountyObj, i) =>
      <TopCountyRows id={"county-" + highWageCountyObj.countyName} countyName={highWageCountyObj.countyName} countyFips={highWageCountyObj.countyFips} state={highWageCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: highWageCountyDivs
    });

  });
  }


  showHighEqualityCounties() {
    fetch("http://localhost:8081/highequalitycounties",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      console.log(res)
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);

    }).then(highEqualCountyList => {
      if (!highEqualCountyList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let highEqualCountyDivs = highEqualCountyList.map((highEqualCountyObj, i) =>
      <TopCountyRows id={"county-" + highEqualCountyObj.countyName} countyName={highEqualCountyObj.countyName} countyFips={highEqualCountyObj.countyFips} state={highEqualCountyObj.state_id}/>
      );

    this.setState ({
      countiesDisplay: highEqualCountyDivs
    });

  });
  }



  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br></br>

        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top Search Recommendations</div>
            <div className="p">Select from one of the following suggested searches by clicking one of the buttons below.  The top 25 counties matching this geographic or demographic criteria will be displayed in the table below.  You can then click any row to see details on that county via the details page.</div>
            <div><br></br></div>
            <button onClick={() => this.showDemCounties()}>Leans Democrate</button>
            <button onClick={() => this.showRepCounties()}>Leans Republican</button>
            <button onClick={() => this.showWarmCounties()}>Warm Weather</button>
            <button onClick={() => this.showColdCounties()}>Cold Weather</button>
            <button onClick={() => this.showHighPopCounties()}>Highly Populated</button>
            <button onClick={() => this.showSmallTownCounties()}>Small Town</button>
            <button onClick={() => this.showHighEducatedCounties()}>Highly Educated</button>
            <button onClick={() => this.showHighIncomeCounties()}>High Median Income</button>
            <button onClick={() => this.showHighWageCounties()}>High Mean Wages</button>
            <button onClick={() => this.showHighEqualityCounties()}>Low Income Inequality Index</button>

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

                {this.state.countiesDisplay}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}