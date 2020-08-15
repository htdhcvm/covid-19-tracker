import React from "react";
import { Line } from "react-chartjs-2";


function Graph(props) {
	let cases = [];
	let deaths = [];
	let recovered = [];
	let day = [];

	for( let iterCases in props.graphData.cases ) {
		cases.push(props.graphData.cases[iterCases]);
		day.push(iterCases.replace("/20", ""));
	}


	for( let iterDeaths in props.graphData.deaths ) {
		deaths.push(props.graphData.deaths[iterDeaths]);
	}


	for( let iterRecovered in props.graphData.recovered ) {
		recovered.push(props.graphData.recovered[iterRecovered]);
	}

	let dataChart = {
		labels : day,
		datasets : [
			
			{
				label: 'Deaths',
				data : deaths,
				fill : false,
				borderColor: "rgba(240, 52, 52, 1)",
				borderWidth: 5,
				pointRadius : false,
			},
			{
				label: 'Cases',
				data : cases,
				fill : false,
				borderColor: "rgba(30,33,41, 1)",
				borderWidth: 5,
				pointRadius : false,
			},
			{
				label: 'Recovered',
				data : recovered,
				fill : false,
				borderColor: "rgba(3, 166, 120, 1)",
				borderWidth: 5,
				pointRadius : false,
			}
		]

	}

	let opt = {
		responsive: true,
		title: {
			display: true
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		
	}

	return (
		<div className="chart">
			<Line data={dataChart} options={opt}/>
		</div>
	)
}

// class Graph extends React.Component {
	
// 	render() {
		

// 		return (
			
//         )
// 	}
// }

export default Graph;
