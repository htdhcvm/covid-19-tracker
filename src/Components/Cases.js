import React from "react";
import shortid from "shortid";

class Cases extends React.Component {

	render() {
		let listCasesDOMLi = this.props.listCases.map( caseL => {
			return(
				<li key={shortid.generate()}>
					<span> {caseL.country} </span>
					<span> {caseL.cases} </span>
				</li>
			);
		})
		return (
			<div className="cases">
				<h2>Live Cases by country</h2>
				<ul>
					{listCasesDOMLi}
				</ul>
			</div>
        )
	}
}

export default Cases;
