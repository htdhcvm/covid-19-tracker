import React from "react";
import shortid from "shortid";
import { Map, Marker, Popup, TileLayer, Circle, CircleMarker } from "react-leaflet";

class MapCovid extends React.Component {
	render() {
		const position = [54.8122, 25.0058];

		let circle = this.props.countryesList.map( country => {
			return (
				<CircleMarker key={shortid.generate()} radius={country.cases / 100000} center={[country.countryInfo.lat, country.countryInfo.long]}>
					<Popup>{country.country}</Popup>
				</CircleMarker>
			)	
		}) 
		return (
			<Map center={position} zoom={13} style={{height: "100%"}}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			
				{circle}

				
			</Map>
        )
	}
}

export default MapCovid;
