CREATE DATABASE MOVE_RECCOMMENDATION;
USE MOVE_RECCOMENDATION;
CREATE TABLE COUNTY_LOCATIONS (
    countyFips int(5),
    countyName char(20),
    state char(20),
    Primary key ( countyFips)
);

CREATE TABLE ZIP_CODE_LOCATIONS (
    zip int(5) ,
    countyFips int(5),
    Primary key (zip, countyFips),
    FOREIGN KEY(countyFips) REFERENCES COUNTY_LOCATIONS(countyFips)
);

CREATE TABLE LOCATION_IDENTIFIER
(
zip INT,
 geoId VARCHAR(40), county INT,
PRIMARY KEY (geoId),
FOREIGN KEY(zip) REFERENCES ZIP_CODE_LOCATIONS(zip),
FOREIGN KEY(county) REFERENCES  COUNTY_LOCATIONS(countyFips)
);

CREATE TABLE EDUCATIONAL_ATTAINMENT
(
geoId VARCHAR(40),
gender VARCHAR(40),
bachelorsOrGreater DECIMAL(4,1),
PRIMARY KEY (geoId, gender),
FOREIGN KEY(geoId) REFERENCES  LOCATION_IDENTIFIER(geoId)
);


CREATE TABLE MARITAL_STATUS
(
geoId VARCHAR(40),
percentMarried DECIMAL(4,1),
minAge INT,
maxAge INT,
gender VARCHAR(10),
PRIMARY KEY (geoId, gender, minAge,maxAge),
FOREIGN KEY(geoId) REFERENCES  LOCATION_IDENTIFIER(geoId)
);

CREATE TABLE ELECTION_RESULTS (
    countyFips int(5),
    state char(20),
    votesGop float(10),
    votesDem float(10),
    totalVotes float(10),
    Primary key (countyFips),
    FOREIGN KEY(countyFips) REFERENCES COUNTY_LOCATIONS(countyFips)

);

CREATE TABLE HISTORICAL_HOME_DATA (
    countyFips int(5),
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

CREATE TABLE COVID_DATA (
    yrmonth DATE,
    State char(20),
    mortality int(10),
    testing_rate float(10),
    icu_usage int(10),
    hospitalized_num int(10),
    primary key (yrmonth, state)
);

CREATE TABLE ECONOMICS_DATA (
yrMonth DATE,
fips int(10),
cpi float(10),
medWage float(10),
UnemploymentRate float(10),
primary key (yrMonth, fips),
FOREIGN KEY(fips) REFERENCES COUNTY_LOCATIONS(countyFips)
)
;


CREATE TABLE POPULATION
(
countyFips INT(5),
totalPopulation INT(20),
Year INT(4),
FOREIGN KEY(countyFips) REFERENCES COUNTY_LOCATIONS(countyFips)
);

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
Zip INT,
tempStation VARCHAR(40),
precpStation VARCHAR(40),
FOREIGN KEY (zip) REFERENCES ZIP_CODE_LOCATIONS (zip),
FOREIGN KEY(tempStation) REFERENCES  WEATHER_STATION(station),
FOREIGN KEY(precpStation) REFERENCES  WEATHER_STATION(station)
);




