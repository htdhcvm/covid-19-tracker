import React from "react";
import "./App.css";

import Box from "./Components/Box";
import Cases from "./Components/Cases";
import Countries from "./Components/DropCountries";
import Graph from "./Components/Graph";
import MapCovid from "./Components/Map";
import "leaflet/dist/leaflet.css";

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


class App extends React.Component {

	constructor(props){
		super(props);

		this.state = { 
			currentContry : "Afghanistan",
			countryesList : null,
			infoAboutCountry : null,
			listCases : null,
			graphData : null
		};

		this.updateDataOnSelectedCountry = this.updateDataOnSelectedCountry.bind(this)
	}


	getTopCountries( countries ) {
		// console.log(countries);
		// countries.sort( ( country_b, country_a ) => {
		// 	return country_b.cases - country_a.cases
		// });
		// console.log(countries);

	}

	componentDidMount() {
		this.getAllCountries()
			.then(response => {
				this.setState({
					countryesList : response,
					listCases : response
				})
			})
		this.getOnCountries(this.state.currentContry)
			.then( response => {
				this.setState({
					infoAboutCountry : {
						cases : response.cases,
						todayCases : response.todayCases,
						deaths : response.deaths,
						todayDeaths : response.todayDeaths,
						recovered : response.recovered,
						todayRecovered : response.todayRecovered
					}
				})
			})

		this.getHistoryOnTime()
			.then( responseData => {
				this.setState({
					graphData : responseData
				})
			})
	}

	getHistoryOnTime( time = 365) {
		return new Promise( resolve => {
			fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${time}`, {
				method : "GET",
				headers : {
					"Content-Type" : "application/json"
				}
			}).then( response => { return response.json() })
			.then( data => { resolve(data)})
		})
	}

	updateDataOnSelectedCountry( country ){
		this.getOnCountries( country )
			.then( responseData => {
				this.setState( { 
					currentContry : country,
					infoAboutCountry : {
						cases : responseData.cases,
						todayCases : responseData.todayCases,
						deaths : responseData.deaths,
						todayDeaths : responseData.todayDeaths,
						recovered : responseData.recovered,
						todayRecovered : responseData.todayRecovered
					}
				})
			})
	}

	getAllCountries () {
		return new Promise( (resolve, reject) => {
			fetch("https://disease.sh/v3/covid-19/countries", {
				method : "GET",
				headers : {
					"Content-Type" : "application/json"
				}
			}).then( response => {
				return response.json()
			}).then(data => {
				resolve(data);
			})
		})
	}

	getOnCountries( country = "Afghanistan" ){
		return new Promise( (resolve, reject) => {
			fetch(`https://disease.sh/v3/covid-19/countries/${country}`, {
				method : "GET",
				headers : {
					"Content-Type" : "application/json"
				}
			}).then( response => {
				return response.json();
			}).then( data => {
				resolve(data);
			})
		})
	}



	render() {
		// console.log(this.state)
		return (
			<section className="covid">
				<section className="header container">
					<h1> COVID-19 TRACKER</h1>			
					{ this.state.countryesList ? <Countries currentContry = {this.state.currentContry} countryList = {this.state.countryesList} handlerUpdateData = {this.updateDataOnSelectedCountry} /> : null}	
				</section>
				<section className="list-box container">
					{ this.state.infoAboutCountry ? <Box title="Coronavirus Cases" perDay={this.state.infoAboutCountry.todayCases} total={this.state.infoAboutCountry.cases}/> : null}
					{ this.state.infoAboutCountry ? <Box title="Recovered" perDay={this.state.infoAboutCountry.todayDeaths} total={this.state.infoAboutCountry.deaths}/> : null}
					{ this.state.infoAboutCountry ? <Box title="Deaths" perDay={this.state.infoAboutCountry.todayRecovered} total={this.state.infoAboutCountry.recovered}/> : null}
				</section>
				<section className="map container">
					{ this.state.countryesList ?  <MapCovid countryesList={this.state.countryesList}/> : null}	
				</section>
				<section className="cases-countries">
					{ this.state.listCases ? <Cases listCases = { this.state.listCases}/> : null}
					{ this.state.graphData ? <Graph graphData = {this.state.graphData} /> : null}
				</section>
			</section>
		)
	}
}

export default App;
