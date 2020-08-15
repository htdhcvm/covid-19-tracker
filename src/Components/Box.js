import React from "react";


function Box (props) {
	return ( 
		<div className="boxInfo">
			<h3 className="title">{props.title}</h3>
			<p className="perDay">{props.perDay}</p>
			<p className="total">{props.total} Total</p>
		</div>
	)
}


export default Box;
