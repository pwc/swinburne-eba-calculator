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
		if(paygrade != "index") {
			basePay += 1200;
		}
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

function getCpi(series: string) {
	const cpiMelbourne = [
	70.5,
70.9,
73.6,
73.9,
74.7,
75.1,
75.5,
76.1,
76.9,
77.3,
77.9,
78.5,
79.6,
79.6 ,
80.1 ,
80.3 ,
81.1 ,
81.3 ,
81.5 ,
82.1 ,
82.7 ,
83.0 ,
83.9 ,
84.3 ,
85.0 ,
86.2 ,
86.8 ,
86.7 ,
86.9 ,
87.9 ,
88.6 ,
89.5 ,
90.7 ,
91.8 ,
92.9 ,
92.3 ,
92.6 ,
92.9 ,
93.4 ,
94.0 ,
95.2 ,
95.8 ,
96.3 ,
96.9 ,
98.5 ,
99.2 ,
99.8 ,
99.9 ,
99.9 ,
100.4,
101.6,
102.0,
102.4,
102.6,
104.0,
104.8,
105.3,
105.9,
106.1,
106.3,
106.4,
107.1,
107.6,
108.3,
108.2,
108.6,
109.1,
109.9,
110.9,
111.0,
111.5,
112.3,
113.3,
113.8,
114.0,
114.6,
114.7,
115.3,
115.9,
116.9,
117.8,
115.7,
116.7,
118.4,
118.8,
119.1,
120.1,
121.4,
124.2,
126.4,
129.0,
131.1,
132.7,
133.5,
135.3,
136.1,
137.5,
];

	let theCpi;
	if(series == "melbourne") {
		theCpi = decorateDates(cpiMelbourne);
	} else if(series == "australia") {
		theCpi = decorateDates(cpiMelbourne);
	} else if(series == "brisbane") {
		theCpi = decorateDates(cpiMelbourne);
	}
	return theCpi;
}

function decorateDates(cpi: any) {
	let currentDate = Date.parse("2000-03-31");
	return cpi.map( (x: any) => {
		const rv = [new Date(currentDate), x];
		currentDate += (365/4)*86400*1000;
		return rv;
	});
}

function getCpiForDate(theCpi: any, theDate: Date) {
	//alert(theCpi.length);
	//alert(theCpi[theCpi.length-1][0]);
	//alert(theDate);
	for(var i = 0; i < theCpi.length; ++i) {
		if(theDate < theCpi[i][0]) {
			return theCpi[i][1];
		}
	}
	// ASSUMED INFLATION
	return theCpi[theCpi.length-1][1];
}

function TableOfValues(props: {startDate: string, cpiSeries: string, paygrade: string}) {

	var rows: any = [];
	var startDate = Date.parse(props.startDate);
	var endDate = Date.parse("2026-12-31");

	var theCpi = getCpi(props.cpiSeries);
	//alert(theCpi.length);
	var baseCpi = getCpiForDate(theCpi, new Date(startDate));
	var basePay = payWithRaises(props.paygrade, new Date(startDate));

	var currentDate = startDate;
	while(currentDate < endDate) {
		let theDate = new Date(currentDate);
		let currentCpi = getCpiForDate(theCpi, theDate);
		let deflator = baseCpi / currentCpi;
		let thePay = payWithRaises(props.paygrade, theDate);
		let deflatedPay = deflator * thePay;
		let payFrac = deflatedPay / basePay;
		rows.push( {
			date: theDate,
			pay: thePay,
			cpi: currentCpi,
			deflator: deflator,
			deflatedPay: deflatedPay,
			payFrac: payFrac,
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
				<th>Fraction of original pay</th>
			</tr>
		</thead>
		<tbody>
		{rows.map( (r: any) => <tr>
			<td>{r.date.toDateString()}</td>
			<td>${r.pay.toFixed(2)}</td>
			<td>{r.cpi}</td>
			<td>{r.deflator.toFixed(2)}</td>
			<td>${r.deflatedPay.toFixed(2)}</td>
			<td>{r.payFrac.toFixed(4)}</td>
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
