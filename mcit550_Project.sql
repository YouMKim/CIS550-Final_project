CREATE DATABASE MOVE_RECOMMENDATION;


USE MOVE_RECOMMENDATION;

/* County Locations (Owner John) */

CREATE TABLE COUNTY_LOCATIONS (
    countyFips char(5),
    countyName char(20),
    state_id char(2),
    Primary key (countyFips)
);

/* Zip Code Locations (Owner John) */

CREATE TABLE ZIP_CODE_LOCATIONS (
    zip char(5),    
    countyFips char(5),
    Primary key (zip, countyFips),
    FOREIGN KEY(countyFips) REFERENCES COUNTY_LOCATIONS(countyFips)
);



/* COVID-19 Data (Owner Ryan) */

CREATE TABLE COVID_DATA (
    yrmonth DATE,
    state_id char(2),
    mortality int(10),
    testing_rate float(10),
    icu_usage int(10),
    hospitalized_num int(10),
    primary key (yrmonth, state_id)
);


/* Economics Data (Owner Kim) */


CREATE TABLE ECONOMICS_DATA (
    yrMonth DATE,
    countyFips char(5),
    cpi float(10),
    medWage float(10),
    UnemploymentRate float(10),
    primary key (yrMonth, countyFips),
    FOREIGN KEY(countyFips) REFERENCES COUNTY_LOCATIONS(countyFips)
);

/* Weather (Owner Rachel) */

CREATE TABLE WEATHER_STATION
(
station VARCHAR(40),
month INT(2),
mtlyTAvg  DECIMAL(9,1),
mtlyTMin DECIMAL(9,1),
mtlyTMax DECIMAL(9,1),
mtlySnowIn DECIMAL(9,1),
mtlyPrecepIn DECIMAL(9,1),
altitutudeM INT(6),
PRIMARY KEY (station, month)
);
 

CREATE TABLE ZIP_STATION
(
zip char(5),
tempStation VARCHAR(40),
precpStation VARCHAR(40),
FOREIGN KEY (zip) REFERENCES ZIP_CODE_LOCATIONS(zip),
FOREIGN KEY(tempStation) REFERENCES  WEATHER_STATION(station),
FOREIGN KEY(precpStation) REFERENCES  WEATHER_STATION(station)
);

/* Identify Location as County or Zip Code */

CREATE TABLE LOCATION_IDENTIFIER
(
zip char(5),
geoId VARCHAR(40),
countyFips char(5),
PRIMARY KEY (geoId),
FOREIGN KEY(zip) REFERENCES ZIP_CODE_LOCATIONS(zip),
FOREIGN KEY(countyFips) REFERENCES  COUNTY_LOCATIONS(countyFips)
);
 
/* Educational Attainment 

CREATE TABLE EDUCATIONAL_ATTAINMENT
(
geoId VARCHAR(40),
gender SET(‘male’,’female’),
bachelorsOrGreater DECIMAL(4,1),
PRIMARY KEY (geoId, gender),
FOREIGN KEY(geoId) REFERENCES  LOCATION_IDENTIFIER(geoId)
);
 
*/

 
/* Marital Status 

CREATE TABLE MARITAL_STATUS
(
geoId VARCHAR(40),
percentMarried DECIMAL(4,1),
minAge SET(15,20,35,45, 55, 65),
maxAge SET(34,44,54,64),
gender SET(‘male’,’female’,’both’)
PRIMARY KEY (geoId, gender, minAge,maxAge),
FOREIGN KEY(geoId) REFERENCES  LOCATION_IDENTIFIER(geoId)
);
*/

/* Population */

CREATE TABLE POPULATION
(
countyFips char(5),
totalPopulation INT(20),
Year INT(4),
FOREIGN KEY(countyFips) REFERENCES COUNTY_LOCATIONS(countyFips)
);



/*Election Results (Owner John) */

CREATE TABLE ELECTION_RESULTS (
    countyFips char(5),
    state_id char(20),
    votesGop int(10),
    votesDem int(10),
    totalVotes int(10),
    Per_gop float(20),
    Per_dem float(20),
    Per_dif float(20),
    Primary key (countyFips),
    FOREIGN KEY(countyFips) REFERENCES COUNTY_LOCATIONS(countyFips)
    
);


/* Historical Home Data (Owner John) */


CREATE TABLE HISTORICAL_HOME_DATA (
    countyFips char(5),
    monthDate char(20),
    medianListingPrice float(10),
    activeListingCount float(10),
    medianDaysOnMarket float(10),
    newListingCount float(10),
    priceIncreasedCount float(10),
    priceReducedCount float(10),
    pendingListingCount float(10),
    medianSquareFeet float(10),
    averageListingPrice float(10),
    totalListingCount float(10),
    Primary key (countyFips, monthDate),
    FOREIGN KEY(countyFips) REFERENCES COUNTY_LOCATIONS(countyFips)
);
