import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// 1 March 2017

function payWithRaises(paygrade: string, date: Date) {
	var basePay = 100;
	if(paygrade == "hew7") {
		basePay = 82585;
	} else if(paygrade == "hew8") {
		basePay = 92838;
	}

	if(date > new Date(Date.parse("2018-03-01"))) {
		basePay *= 1.02;
		basePay += 1200;
	}
	if(date > new Date(Date.parse("2019-03-01"))) { basePay *= 1.02; }
	if(date > new Date(Date.parse("2020-03-01"))) { basePay *= 1.02; }
	if(date > new Date(Date.parse("2021-03-01"))) { basePay *= 1.02; }
	if(date > new Date(Date.parse("2022-03-01"))) { basePay *= 1.02; }
	if(date > new Date(Date.parse("2023-08-22"))) { basePay *= 1.035; }
	if(date > new Date(Date.parse("2024-07-01"))) { basePay *= 1.04; }
	if(date > new Date(Date.parse("2025-07-01"))) { basePay *= 1.04; }
	if(date > new Date(Date.parse("2026-07-01"))) { basePay *= 1.0375; }
	return basePay;
}

function TableOfValues(props: {startDate: string, cpiSeries: string, paygrade: string}) {

	var rows: any = [];
	var startDate = Date.parse(props.startDate);
	var endDate = Date.parse("2026-12-31");

	var currentPay
	var currentDate = startDate;
	while(currentDate < endDate) {
		let theDate = new Date(currentDate);
		rows.push( {
			date: theDate,
			pay: payWithRaises(props.paygrade, theDate), 
		} );
		currentDate += 14*86400*1000;
	}
	//for(; currentDate += 14*86400*1000; currentDate < endDate) {
	//}

	return <table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Nominal pay</th>
				<th>CPI</th>
				<th>Deflator</th>
				<th>Pay in reference dollars</th>
				<th>Comment</th>
			</tr>
		</thead>
		<tbody>
		{rows.map( (r: any) => <tr>
			<td>{r.date.toDateString()}</td>
			<td>${r.pay.toFixed(2)}</td>
		</tr>)}
		</tbody>
	</table>;
}

function App() {
	const [startDate, setStartDate] = useState("2020-01-01");
	const [cpiSeries, setCpiSeries] = useState("melbourne");
	const [paygrade, setPaygrade] = useState("index");

	return (<main>
		<h1>Swinburne EBA calculator</h1>
		<p>This application tells you how you fare given Swinburne’s pay rises.</p>
		<p>Note that it <b>doesn’t</b> take into account promotions or increases in increment (merit pay rises). These reflect your improved skills, performance and experience, rather than Swinburne increasing your salary.</p>
		<h2>Settings</h2>
		<label>Start date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></label>
		<label>CPI group: <select value={cpiSeries} onChange={(e) => setCpiSeries(e.target.value)}>
			<option value="melbourne">Melbourne</option>
			<option value="australia">Australia-wide</option>
			<option value="brisbane">Brisbane</option>
		</select></label>
		<label>Pay grade: <select value={paygrade} onChange={(e) => setPaygrade(e.target.value)}>
			<option value="index">Index ($100)</option>
			<option value="hew7">HEW 7</option>
			<option value="hew8">HEW 8</option>
		</select></label>
		<h2>Table of values</h2>
		<TableOfValues
			startDate={startDate}
			cpiSeries={cpiSeries}
			paygrade={paygrade}
		/>
	</main>
	);
}

export default App;
