# CIT550_project


### NOTE ###
This repository is a copy from the private repo that was used for my CIS550 class from University of Pennsylvania.
I copied it here and made it public so that it can be shared


## Overview
This project leverages the homework 2 code as a starting point for creating an application for recommending places to live based on numerous demographic, geographic, economic and political data points.  The hw2 code base was overhauled and new components and pages created in its place.  The main pages of the application are as follows:
- Dashboard: This page is the landing page of the website and includes a number of suggested criteria for showing the top 25 US counties for that criteria
- CountySummary: Provides the user with a detailed look at a county with all of the available data for it displayed.
- Recommendation Tool: Provides the user with the ability to input data points in a number of criteria areas.  These inputs are passed into a SQL query which returns back a list of US counties that match the entered criteria.

## Dependencies
The following dependencies are required for this project
- bootstrap
- React.js
- npm


## Building the Project
As this project is based off of the homework 2 code, the steps for loading the site on local follow the same process.
- Download code base
- Via terminal access the server folder and type npm install
- In another terminal window/tab access the clilent server and type npm install, next type npm install --save react-router
- Via terminal access the server folder and type npm start
- In another terminal window/tab access the clilent server and type npm start
- At this point the site should load
