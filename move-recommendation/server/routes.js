var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


//Provides a list of all the counties in the Database only Names
function getAllCountyNames(req, res) {
  var query = `
    SELECT countyName
    FROM COUNTY_LOCATIONS
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log("rows", rows);
      res.json(rows);
    }
  });
};

//Provides all the counties in the database with countyFips, countyName and state_id
function getAllCounties(req, res) {
  var query = `
    SELECT countyFips, countyName, state_id
    FROM COUNTY_LOCATIONS
    ORDER BY state_id DESC, countyName DESC
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log("rows", rows);
      res.json(rows);
    }
  });
}

//Provides a list of all counties where the majority of votes went to the Democratic Presidential Candidate
function getDemocraticLeaningCounties(req, res) {
  var query = `
    SELECT cl.countyFips, cl.countyName, cl.state_id, er.votesDem, er.votesGop, er.totalVotes
    FROM COUNTY_LOCATIONS cl JOIN ELECTION_RESULTS er ON er.countyFips = cl.countyFips
    WHERE votesDem > votesGop
    ORDER BY votesDem DESC
    LIMIT 25;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log("rows", rows);
      res.json(rows);
    }
  });
}

//Provides a list of all counties where the majority of votes went to the Republican Presidential Candidate
function getRepublicanLeaningCounties(req, res) {
  var query = `
    SELECT cl.countyFips, cl.countyName, cl.state_id, er.votesDem, er.votesGop, er.totalVotes
    FROM COUNTY_LOCATIONS cl JOIN ELECTION_RESULTS er ON er.countyFips = cl.countyFips
    WHERE votesDem < votesGop
    ORDER BY votesGop DESC
    LIMIT 25;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log("rows", rows);
      res.json(rows);
    }
  });
}


// Call to get all zip codes within a specific county by passing in the County Fip
function getZipCodesInCounty(req, res) {
  var countyFipsInput = req.params.countyFips;
  var query = `
    SELECT tcl.countyFips, cl.countyName, cl.state_id, zcl.zip
    FROM COUNTY_LOCATIONS cl JOIN ZIP_CODE_LOCATIONS zcl ON zcl.countyFips = cl.countyFips
    WHERE cl.countyFips = '${countyFipsInput}';
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Call to get all counties with WARM CLIMATE
function getWarmClimateCounties(req, res) {
  var query = `
    SELECT distinct state_id,countyName, countyFips
    FROM
    (SELECT state_id,countyName, cl.countyFips
    FROM COUNTY_LOCATIONS cl
    LEFT JOIN ZIP_CODE_LOCATIONS zcl on zcl.countyFips= cl.countyFips
    LEFT JOIN ZIP_STATION zs on zcl.zip =zs.zip
    LEFT JOIN WEATHER_STATION ws on ws.station =zs.station
    WHERE weatherType="temp"
    GROUP BY zcl.zip
    HAVING  avg(mtlyTMax)>=75   OR avg(mtlyTAvg)>=65
    ORDER BY avg(mtlyTMax) DESC)ally
    LIMIT 25;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log("rows", rows);

      res.json(rows);
    }
  });
};

// Call to get all counties with COLD CLIMATE
function getColdClimateCounties(req, res) {
  var query = `
  SELECT distinct state_id,countyName, countyFips
    FROM
    (SELECT distinct state_id,countyName, cl.countyFips
    FROM COUNTY_LOCATIONS cl
    LEFT JOIN ZIP_CODE_LOCATIONS zcl on zcl.countyFips= cl.countyFips
    LEFT JOIN ZIP_STATION zs on zcl.zip =zs.zip
    LEFT JOIN WEATHER_STATION ws on ws.station =zs.station
    WHERE weatherType="temp"
    GROUP BY zcl.zip
    HAVING  avg(mtlyTMax)<=51 OR avg(mtlyTAvg)<=41
    ORDER BY avg(mtlyTMax) ASC)allcold
    LIMIT 25;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};



// Call to get all counties with MILD CLIMATE
function getMildClimateCounties(req, res) {
  var query = `
    SELECT distinct state_id,countyName, cl.countyFips
    FROM COUNTY_LOCATIONS cl
    LEFT JOIN ZIP_CODE_LOCATIONS zcl on zcl.countyFips= cl.countyFips
    LEFT JOIN ZIP_STATION zs on zcl.zip =zs.zip
    LEFT JOIN WEATHER_STATION ws on ws.station =zs.station
    WHERE weatherType="temp"
    GROUP BY zcl.zip
    HAVING  avg(mtlyTMax)>51   AND avg(mtlyTMax)<75 AND  avg(mtlyTAvg)>41 AND avg(mtlyTAvg)<65;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


// Call to get all summary data for a county
function getCountySummaryData(req, res) {
  var countyFipsInput = req.params.countyFips;
  var query = `
    SELECT cl.countyName, cl.state_id,
    percentMarried,
    cl.countyFips ,
    bachelorsOrGreater ,
    totalPopulation,
    votesGOP/totalVotes*100 as "percentGOP",votesDem/totalVotes*100 as "percentDEM",
    medianListingPrice, medianSquareFeet,medianDaysOnMarket
    FROM COUNTY_LOCATIONS cl
    LEFT JOIN LOCATION_IDENTIFIER li on li.locationCountyorZip=cl.countyFips
    LEFT JOIN  MARITAL_STATUS ms ON ms.geoId=li.geoId
    LEFT JOIN EDUCATIONAL_ATTAINMENT ea ON li.geoId=ea.geoId
    LEFT JOIN POPULATION p ON cl.countyFips=p.countyFips
    LEFT JOIN ELECTION_RESULTS er ON cl.countyFips=er.countyFips
    LEFT JOIN HISTORICAL_HOME_DATA hhd ON cl.countyFips=hhd.countyFips
    WHERE cl.countyFips = '${countyFipsInput}'
    AND location_type="county"
    ORDER BY  minAge, maxAge DESC, ms.gender,ea.gender,p.year DESC, monthDate DESC
    LIMIT 1;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


// Call to get all counties with highly educated population
function getHighlyEducatedCounties(req, res) {
  var query = `
    SELECT cl.countyFips, cl.countyName, state_id
    FROM COUNTY_LOCATIONS cl JOIN LOCATION_IDENTIFIER li ON li.locationCountyorZIP=cl.countyFips
    JOIN EDUCATIONAL_ATTAINMENT ea on li.geoId=ea.geoId
    WHERE bachelorsOrGreater>=31.5 AND gender="both"
    ORDER BY bachelorsOrGreater DESC
    LIMIT 25;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Call to get all counties with middling educated population
function getMidEducatedCounties(req, res) {
  var query = `
    SELECT cl.countyFips, cl.countyName, state_id
    FROM COUNTY_LOCATIONS cl JOIN LOCATION_IDENTIFIER li ON li.locationCountyorZIP=cl.countyFips
     EDUCATIONAL_ATTAINMENT ea on li.geoId=ea.geoId
    WHERE bachelorsOrGreater<31.5 AND bachelorsOrGreater>13.2 AND gender="both";
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Call to get all counties with low educated population
function getLowEducatedCounties(req, res) {
  var query = `
    SELECT distinct cl.countyFips, cl.countyName, state_id
    FROM COUNTY_LOCATIONS cl JOIN LOCATION_IDENTIFIER li ON li.locationCountyorZIP=cl.countyFips
    JOIN EDUCATIONAL_ATTAINMENT ea on li.geoId=ea.geoId
    WHERE bachelorsOrGreater<13.2 AND gender="both"
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Call to get all counties with high population levels
function getHighlyPopulatedCounties(req, res) {
  var query = `
    SELECT DISTINCT cl.countyFips, cl.countyName, state_id, totalPopulation
    FROM COUNTY_LOCATIONS cl JOIN POPULATION p ON p.countyFips=cl.countyFips
    WHERE totalPopulation>500000 AND year=2019
    ORDER BY totalPopulation DESC
    LIMIT 25;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Call to get all counties with middling population levels
function getMidPopulatedCounties(req, res) {
  var query = `
    SELECT cl.countyFips, cl.countyName, state_id, totalPopulation
    FROM COUNTY_LOCATIONS cl JOIN POPULATION p ON p.countyFips=cl.countyFips
    WHERE totalPopulation>100000 AND totalPopulation<500000 AND year=2019

  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Call to get all counties with low population levels
function getLowPopulatedCounties(req, res) {
  var query = `
    SELECT DISTINCT cl.countyFips, cl.countyName, state_id, totalPopulation
    FROM COUNTY_LOCATIONS cl JOIN POPULATION p ON p.countyFips=cl.countyFips
    WHERE totalPopulation<100000 AND year=2019
    ORDER BY totalPopulation ASC
    LIMIT 25;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Get High Wage Counties 
function getHighWageCounties(req,res){
  var query = `
  SELECT DISTINCT cl.countyFips, cl.countyName, state_id, mean_household_wages
  FROM COUNTY_LOCATIONS cl JOIN ECONOMICS_DATA e ON e.countyFips=cl.countyFips
  WHERE YrMonth= '201901'
  ORDER BY mean_household_wages desc
  LIMIT 25;
  `;  
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

//Get high median income counties 
function getHighMedianIncomeCounties(req,res){
  var query = `
  SELECT DISTINCT cl.countyFips, cl.countyName, state_id, median_household_income
  FROM COUNTY_LOCATIONS cl JOIN ECONOMICS_DATA e ON e.countyFips=cl.countyFips
  WHERE YrMonth= '201901'
  ORDER BY median_household_income desc
  LIMIT 25;
  `;  
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// get most equal counties

function getMostEqualCounties(req,res){
  var query = `
  SELECT DISTINCT cl.countyFips, cl.countyName, state_id, income_inequality_index
  FROM COUNTY_LOCATIONS cl JOIN ECONOMICS_DATA e ON e.countyFips=cl.countyFips
  WHERE YrMonth= '201901' and income_inequality_index is not null and income_inequality_index != 0 
  ORDER BY income_inequality_index 
  LIMIT 25;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


//Provides the top ten county matches in descending order for reccomended move based on user selected button values.  Recommended default values (without selecting buttons) listed below  will return 0 results.
function getCountyRecommendations(req, res) {

  var min_wages = req.params.minWage;
  var min_income = req.params.minIncome;
  var house_price = req.params.meanHousePrice;
  var budget_allowance = req.params.housingAllowance;
  var political_lean = req.params.polParam;
  var education_param = req.params.eduParam;
  var population_param = req.params.popParam.replace(/&/g," ");
  var weather_param = req.params.weatherParam.replace(/&/g," ");




  var query = `
  select distinct cl.countyName,  cl.countyFips, state_id
  from COUNTY_LOCATIONS cl

  join (select countyFips from ECONOMICS_DATA
  where YrMonth= '201901' and mean_household_wages >= ${min_wages}  and  median_household_income >= ${min_income}  ) econ
  on cl.countyFips = econ.countyFips

  join ( select distinct countyFips from HISTORICAL_HOME_DATA
  where  monthDate >= 202001 and averageListingPrice <= ${house_price} + ${budget_allowance}) housing 
  on cl.countyFips = housing.countyFips

  join (select countyFips from ELECTION_RESULTS
  where Per_dem ${political_lean} Per_gop ) pol 
  on cl.countyFips = pol.countyFips

  join (SELECT distinct locationCountyorZIP from EDUCATIONAL_ATTAINMENT ea 
  join LOCATION_IDENTIFIER li on li.geoId=ea.geoId
  WHERE bachelorsOrGreater>=${education_param} AND gender="both") education
  on education.locationCountyorZIP=cl.countyFips

  join ( select countyFips from POPULATION
  where year = 2019 and ${population_param}) pop 
  on cl.countyFips = pop.countyFips

  join (SELECT distinct countyFips 
  FROM ZIP_CODE_LOCATIONS zcl
  LEFT JOIN ZIP_STATION zs on zcl.zip =zs.zip
  LEFT JOIN WEATHER_STATION ws on ws.station =zs.station
  WHERE weatherType="temp"
  GROUP BY zcl.zip
  ${weather_param} ) weather 
  on weather.countyFips = cl.countyFips
  
  order by rand() desc
  LIMIT 10;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Call to get all state COVID data from a state by selecting a county
function getStateCovid(req, res) {
  var countyFipsInput = req.params.countyFips;
  var query = `
    SELECT cl.state_id, yrmonth, mortality, testing_rate, icu_usage, hospitalized_num
    FROM COVID_DATA cd JOIN COUNTY_LOCATIONS cl on cl.state_id=cd.state_id
    WHERE cl.countyFips=${countyFipsInput}
    ORDER BY yrmonth DESC
    LIMIT 1
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(countyFipsInput);
    }
  });
};

// Call to get stats on all zip codes within a specific county by passing in the County Fip
function getZipCodesInCounty(req, res) {
  var countyFipsInput = req.params.countyFips;
  var query = `
    SELECT cl.countyFips, cl.countyName, cl.state_id, zcl.zip
    FROM COUNTY_LOCATIONS cl JOIN ZIP_CODE_LOCATIONS zcl ON zcl.countyFips = cl.countyFips

    WHERE cl.countyFips = '${countyFipsInput}';
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};
//Call to get REP/DEM % votes
function getCountyPolitics(req, res) {
  var countyFipsInput = req.params.countyFips;
  var query = `
    SELECT
    votesGOP/totalVotes*100 as "percentGOP",votesDem/totalVotes*100 as "percentDEM",
    FROM COUNTY_LOCATIONS cl
    LEFT JOIN ELECTION_RESULTS er ON cl.countyFips=er.countyFips
    WHERE cl.countyFips = '${countyFipsInput}'
    ;
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(countyFipsInput);
    }
  });
};

function getCountyWeather(req, res) {
  var countyFipsInput = req.params.countyFips;
  var query = `
SELECT month,mtlyTAvg,mtlyTMax,mtlyTMin
FROM ZIP_CODE_LOCATIONS zcl JOIN ZIP_STATION zs ON zcl.zip=zs.zip JOIN WEATHER_STATION ws on zs.station=ws.station
WHERE zcl.countyFips= '${countyFipsInput}' AND weatherType='temp'
ORDER BY zs.zip
LIMIT 12;
`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(countyFipsInput);
    }
  });
};

function getCountyEcon(req, res) {
  var countyFipsInput = req.params.countyFips;
  var query = `
SELECT countyFips, mean_household_wages, income_inequality_index,percent_below_poverty,median_household_income
FROM ECONOMICS_DATA
WHERE YrMonth = "201901" and countyFips = '${countyFipsInput}'
`
;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      console.log(countyFipsInput);
    }
  });
};

// Call to get educational attainment and marriage information on all zip codes within a specific county by passing in the County Fip
function getZipCodesStatsInCounty(req, res) {
  var countyFipsInput = req.params.countyFips;
  var query = `
  SELECT zcl.zip,  ea.bachelorsOrGreater as allbachelors, ea2.bachelorsOrGreater as femalebachelors, ea3.bachelorsOrGreater as malebachelors, ms.percentMarried as allAgesMarried,
 ms2.percentMarried as youngfemalesmarried, ms2.percentMarried as youngmalesmarried
	FROM COUNTY_LOCATIONS cl JOIN ZIP_CODE_LOCATIONS zcl ON zcl.countyFips = cl.countyFips
    LEFT JOIN LOCATION_IDENTIFIER li ON li.locationCountyorZIP=zcl.zip
    JOIN  EDUCATIONAL_ATTAINMENT ea ON li.geoId=ea.geoId
    JOIN  EDUCATIONAL_ATTAINMENT ea2 ON li.geoId=ea2.geoId
    JOIN  EDUCATIONAL_ATTAINMENT ea3 ON li.geoId=ea3.geoId
    JOIN  MARITAL_STATUS ms ON li.geoId=ms.geoId
    JOIN  MARITAL_STATUS ms2 ON li.geoId=ms2.geoId
    JOIN  MARITAL_STATUS ms3 ON li.geoId=ms3.geoId
    WHERE cl.countyFips ='${countyFipsInput}' AND ea.gender='both' AND ea2.gender='female' AND ea3.gender='male'
    AND ms.minAge=15 AND ms.maxAge=125 AND ms.gender='both'
    AND ms2.minAge=20 AND ms2.maxAge=34 AND ms2.gender='female'
    AND ms3.minAge=20 AND ms3.maxAge=34 AND ms3.gender='male'
    ;`
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllCountyNames: getAllCountyNames,
  getAllCounties: getAllCounties,
  getDemocraticLeaningCounties: getDemocraticLeaningCounties,
  getRepublicanLeaningCounties: getRepublicanLeaningCounties,
  getZipCodesInCounty: getZipCodesInCounty,
  getWarmClimateCounties: getWarmClimateCounties,
  getColdClimateCounties: getColdClimateCounties,
  getMildClimateCounties: getMildClimateCounties,
  getCountySummaryData: getCountySummaryData,
  getHighlyEducatedCounties: getHighlyEducatedCounties,
  getMidEducatedCounties: getMidEducatedCounties,
  getLowEducatedCounties: getLowEducatedCounties,
  getHighlyPopulatedCounties: getHighlyPopulatedCounties,
  getMidPopulatedCounties: getMidPopulatedCounties,
  getLowPopulatedCounties: getLowPopulatedCounties,
  getCountyRecommendations:getCountyRecommendations,
  getHighWageCounties: getHighWageCounties,
  getHighMedianIncomeCounties: getHighMedianIncomeCounties,
  getMostEqualCounties: getMostEqualCounties,
  getStateCovid:getStateCovid,
  getCountyPolitics:getCountyPolitics,
  getCountyWeather:getCountyWeather,
  getCountyEcon: getCountyEcon,    
  getZipCodesStatsInCounty:getZipCodesStatsInCounty
}
