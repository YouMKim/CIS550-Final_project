const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */



/* ---- (Dashboard) ---- */

app.get('/counties', routes.getAllCounties);
app.get('/countyNames', routes.getAllCountyNames);
app.get('/demcounties', routes.getDemocraticLeaningCounties);
app.get('/repcounties', routes.getRepublicanLeaningCounties);
app.get('/zipcode/:countyFips', routes.getZipCodesInCounty); //pass countyfips to route
app.get('/warmclimatecounties', routes.getWarmClimateCounties);
app.get('/coldclimatecounties', routes.getColdClimateCounties);
app.get('/mildclimatecounties', routes.getMildClimateCounties);
app.get('/countysummary/:countyFips', routes.getCountySummaryData); //pass countyfips to route
app.get('/highlyeducatedcounties', routes.getHighlyEducatedCounties);
app.get('/mideducatedcounties', routes.getMidEducatedCounties);
app.get('/loweducatedcounties', routes.getLowEducatedCounties);
app.get('/highlypopulatedcounties', routes.getHighlyPopulatedCounties);
app.get('/midpopulatedcounties', routes.getMidPopulatedCounties);
app.get('/lowpopulatedcounties', routes.getLowPopulatedCounties);
app.get('/highmedianincomecounties', routes.getHighMedianIncomeCounties);
app.get('/highwagecounties', routes.getHighWageCounties);
app.get('/highequalitycounties', routes.getMostEqualCounties);
app.get('/getCountyRecommendations/:minWage/:minIncome/:meanHousePrice/:housingAllowance/:polParam/:eduParam/:popParam/:weatherParam', routes.getCountyRecommendations);
app.get('/statecovid/countysummary/:countyFips',routes.getStateCovid);
app.get('/countypolitics/countysummary/:countyFips',routes.getCountyPolitics);
app.get('/countyweather/countysummary/:countyFips',routes.getCountyWeather);
app.get('/countyecon/countysummary/:countyFips',routes.getCountyEcon)
app.get('/countyzipstats/countysummary/:countyFips', routes.getZipCodesStatsInCounty)





app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});