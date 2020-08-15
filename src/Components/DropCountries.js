import React from "react";
import shortid from "shortid";

class Countries extends React.Component {
	constructor(props) {
		super(props);
		this.handlerClickCountry = this.handlerClickCountry.bind(this);
	}

	handlerClickCountry( event ) {
		event.preventDefault();
		this.props.handlerUpdateData(event.target.value);
		console.log(event.target.value);
	}
	
	render() {
		let listCountry = this.props.countryList.map( country => {
			return (
				<option key={shortid.generate()}>
					{country.country}
				</option>
			)
		})
		return ( 
			<select  value={this.props.currentContry} onChange={this.handlerClickCountry}  >
				{listCountry}
			</select>
		)
	}
}

export default Countries;
