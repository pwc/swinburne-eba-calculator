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

function getComment(date: Date) {
	if(date > new Date(Date.parse("2026-07-01"))) { return "2026 - Proposed 3.75% increase"; }
	if(date > new Date(Date.parse("2025-07-01"))) { return "2025 - Proposed 4% increase"; }
	if(date > new Date(Date.parse("2024-07-01"))) { return "2024 - Proposed 4% increase"; }
	if(date > new Date(Date.parse("2023-08-22"))) { return "2023 - 3.5% outside EBA"; }
	if(date > new Date(Date.parse("2022-03-01"))) { return "2022 - 2% outside EBA"; }
	if(date > new Date(Date.parse("2021-03-01"))) { return "2021 - EBA 2%"; }
	if(date > new Date(Date.parse("2020-03-01"))) { return "2020 - EBA 2%"; }
	if(date > new Date(Date.parse("2019-03-01"))) { return "2019 - EBA 2%"; }
	if(date > new Date(Date.parse("2018-03-01"))) { return "2018 - EBA 2% + $1200"; }
	return "";
}

function getCpi(series: string) {
	const cpiAustralia = [
69.7  ,
70.2  ,
72.9  ,
73.1  ,
73.9  ,
74.5  ,
74.7  ,
75.4  ,
76.1  ,
76.6  ,
77.1  ,
77.6  ,
78.6  ,
78.6  ,
79.1  ,
79.5  ,
80.2  ,
80.6  ,
80.9  ,
81.5  ,
82.1  ,
82.6  ,
83.4  ,
83.8  ,
84.5  ,
85.9  ,
86.7  ,
86.6  ,
86.6  ,
87.7  ,
88.3  ,
89.1  ,
90.3  ,
91.6  ,
92.7  ,
92.4  ,
92.5  ,
92.9  ,
93.8  ,
94.3  ,
95.2  ,
95.8  ,
96.5  ,
96.9  ,
98.3  ,
99.2  ,
99.8  ,
99.8  ,
99.9  ,
100.4 ,
101.8 ,
102.0 ,
102.4 ,
102.8 ,
104.0 ,
104.8 ,
105.4 ,
105.9 ,
106.4 ,
106.6 ,
106.8 ,
107.5 ,
108.0 ,
108.4 ,
108.2 ,
108.6 ,
109.4 ,
110.0 ,
110.5 ,
110.7 ,
111.4 ,
112.1 ,
112.6 ,
113.0 ,
113.5 ,
114.1 ,
114.1 ,
114.8 ,
115.4 ,
116.2 ,
116.6 ,
114.4 ,
116.2 ,
117.2 ,
117.9 ,
118.8 ,
119.7 ,
121.3 ,
123.9 ,
126.1 ,
128.4 ,
130.8 ,
132.6 ,
133.7 ,
135.3 ,
136.1 ,
137.4 ,
	];
	const cpiBrisbane = [
67.9  ,
68.3  ,
71.0  ,
71.2  ,
71.8  ,
72.5  ,
72.6  ,
73.5  ,
74.2  ,
74.7  ,
75.3  ,
75.7  ,
76.7  ,
76.7  ,
77.5  ,
78.0  ,
78.7  ,
79.1  ,
79.4  ,
80.0  ,
80.7  ,
81.1  ,
81.6  ,
82.3  ,
83.0  ,
84.5  ,
85.2  ,
85.1  ,
85.5  ,
86.7  ,
87.5  ,
88.4  ,
89.6  ,
91.1  ,
92.4  ,
92.2  ,
92.4  ,
92.9  ,
94.2  ,
94.5  ,
95.2  ,
95.9  ,
96.9  ,
97.4  ,
98.6  ,
99.6  ,
99.9  ,
99.7  ,
99.9  ,
100.5 ,
101.6 ,
101.9 ,
102.0 ,
102.5 ,
103.8 ,
104.6 ,
105.2 ,
105.8 ,
106.5 ,
106.7 ,
106.7 ,
107.4 ,
108.1 ,
108.5 ,
108.5 ,
109.0 ,
109.7 ,
110.2 ,
110.5 ,
111.0 ,
111.4 ,
112.3 ,
112.4 ,
112.9 ,
113.4 ,
114.0 ,
114.1 ,
114.8 ,
115.5 ,
116.3 ,
116.2 ,
113.6 ,
116.2 ,
117.5 ,
118.2 ,
119.2 ,
120.7 ,
122.6 ,
125.3 ,
127.9 ,
130.2 ,
132.1 ,
134.6 ,
136.0 ,
137.0 ,
137.7 ,
139.2 ,
	];
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
		theCpi = decorateDates(cpiAustralia);
	} else if(series == "brisbane") {
		theCpi = decorateDates(cpiBrisbane);
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
	let lastComment = "";
	while(currentDate < endDate) {
		let theDate = new Date(currentDate);
		let currentCpi = getCpiForDate(theCpi, theDate);
		let deflator = baseCpi / currentCpi;
		let thePay = payWithRaises(props.paygrade, theDate);
		let deflatedPay = deflator * thePay;
		let payFrac = deflatedPay / basePay;

		let newComment = getComment(theDate);
		if(newComment != lastComment) {
			lastComment = newComment;
		} else {
			newComment = "";
		}

		rows.push( {
			date: theDate,
			pay: thePay,
			cpi: currentCpi,
			deflator: deflator,
			deflatedPay: deflatedPay,
			payFrac: payFrac,
			comment: newComment,
		} );
		currentDate += 14*86400*1000;
	}
	rows[0].comment = "Commencement";
	//for(; currentDate += 14*86400*1000; currentDate < endDate) {
	//}

	return <table>
		<thead>
			<tr>
				<th>Fortnight</th>
				<th>Nominal pay</th>
				<th>CPI</th>
				<th>Deflator</th>
				<th>Pay in reference dollars</th>
				<th>Fraction of original pay</th>
				<th>Note</th>
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
			<td>{r.comment}</td>
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
		<p>Swinburne has proposed a new enterprise bargaining agreement (EBA) with pay rises over the forthcoming three years.</p>
		<p>This raises the question: how have our raises (since 2017) kept pace with inflation. <b>This application helps you answer that question.</b></p>
		<p>Note that it <b>doesn’t</b> take into account promotions or increases in increment (merit pay rises). These reflect your improved skills, performance and experience, rather than Swinburne increasing your salary.</p>
		<p>CPI is the Consumer Price Index, and is the Australian Bureau of Statistics’ inflation measure.</p>
		<p className="attribution">Data: Australian Bureau of Statistics, Swinburne University of Technology,
Academic &amp; General Staff Enterprise
Agreement 2017, proposed Swinburne University of Technology -
Academic and Professional Employees
Enterprise Agreement
2024</p>
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
