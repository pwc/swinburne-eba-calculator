import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// 1 March 2017

function payWithRaises(paygrade: string, date: Date) {
	var basePay = 100;
	const basepayLookup: Map<String, Number> = new Map([
		['hew1', 46979],
		['hew2', 50201],
		['hew3', 52502],
		['hew4', 59520],
		['hew5', 64646],
		['hew6', 74894],
		['hew7', 82585],
		['hew8', 92838],
		['hew9', 108214],
		['hew10', 115902],
		['acaA', 64501],
		['acaB', 91849],
		['acaC', 112383],
		['acaD', 135204],
		['acaE', 173994],
	]);

	basePay = basepayLookup.get(paygrade) as number;

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

function getCpiForDate(theCpi: any, theDate: Date, inflationRate: number) {
	//alert(theCpi.length);
	//alert(theCpi[theCpi.length-1][0]);
	//alert(theDate);
	for(var i = 0; i < theCpi.length; ++i) {
		if(theDate < theCpi[i][0]) {
			return theCpi[i][1];
		}
	}
	// ASSUMED INFLATION

	let yearsAfterEnd = (theDate.valueOf() - theCpi[theCpi.length-1][0].valueOf()) / ( 365*86400*1000 );
	let cpiFactor = theCpi[theCpi.length-1][1]*( (1+inflationRate) ** yearsAfterEnd);

	return cpiFactor;
}

function TableOfValues(props: {startDate: string, cpiSeries: string, paygrade: string, showAll: boolean, inflationRate: number}) {

	let rows = generateAllTheRows(props.cpiSeries, props.inflationRate, props.paygrade, props.startDate);

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
		{rows.map( (r: any) => { if(props.showAll || r.comment.length) { return <tr>
			<td>{formatDate(r.date)}</td>
			<td>{formatPay(r.pay)}</td>
			<td>{r.cpi.toFixed(1)}</td>
			<td>{r.deflator.toFixed(2)}</td>
			<td>{formatPay(r.deflatedPay)}</td>
			<td>{r.payFrac.toFixed(2)}</td>
			<td>{r.comment}</td>
		</tr>} else { return <></> } })}
		</tbody>
	</table>;
}

function generateAllTheRows(cpiSeries: string, inflationRate: number, paygrade: string, strStartDate: string) {
	let startDate = Date.parse(strStartDate);
	let endDate = Date.parse("2026-12-31");

	let rows: any = [];
	let theCpi = getCpi(cpiSeries);
	let baseCpi = getCpiForDate(theCpi, new Date(startDate), inflationRate);
	let basePay = payWithRaises(paygrade, new Date(startDate));

	let currentDate = startDate;
	let lastComment = "";
	while(currentDate < endDate) {
		let theDate = new Date(currentDate);
		let currentCpi = getCpiForDate(theCpi, theDate, inflationRate);
		let deflator = baseCpi / currentCpi;
		let thePay = payWithRaises(paygrade, theDate);
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
	return rows;
}

function formatDate(n: Date) {
	const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return '' + n.getDate() + ' ' + month[n.getMonth()] + ' ' + n.getFullYear();
}

function formatPay(n: number) {
	return(new Intl.NumberFormat('au-EN', { 'style': 'currency', currency: 'AUD' }).format(n));
}

function App() {
	const [startDate, setStartDate] = useState("2020-01-01");
	const [cpiSeries, setCpiSeries] = useState("melbourne");
	const [paygrade, setPaygrade] = useState("hew7");
	const [showAll, setShowAll] = useState(true);
	const [inflationRate, setInflationRate] = useState(0.03);

	return (<main>
		<h1>EBA calculator</h1>
		<p>Consider a new enterprise bargaining agreement (EBA) with pay rises over the forthcoming three years.</p>
		<p>This raises the question: how well does it keep pace with inflation? <b>This application helps you answer that question.</b></p>
		<p>Note that it <b>doesn’t</b> take into account promotions or increases in increment (merit pay rises). These reflect your improved skills, performance and experience, rather than the employer increasing your salary.</p>
		<p>CPI is the Consumer Price Index, and is the Australian Bureau of Statistics’ inflation measure. Important note: the CPI is assumed to be constant at the specified rate, after March 2024.</p>
		<p className="attribution">Data: Australian Bureau of Statistics.</p>
		<h2>Settings</h2>
		<label>Start date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></label>
		<label>CPI group: <select value={cpiSeries} onChange={(e) => setCpiSeries(e.target.value)}>
			<option value="melbourne">Melbourne</option>
			<option value="australia">Australia-wide</option>
			<option value="brisbane">Brisbane</option>
		</select></label>
		<label>Pay grade: <select value={paygrade} onChange={(e) => setPaygrade(e.target.value)}>
			<option value="hew1">HEW 1.1</option>
			<option value="hew2">HEW 2.1</option>
			<option value="hew3">HEW 3.1</option>
			<option value="hew4">HEW 4.1</option>
			<option value="hew5">HEW 5.1</option>
			<option value="hew6">HEW 6.1</option>
			<option value="hew7">HEW 7.1</option>
			<option value="hew8">HEW 8.1</option>
			<option value="hew9">HEW 9.1</option>
			<option value="hew10">HEW 10.1</option>
			<option value="acaA">Level A academic</option>
			<option value="acaB">Level B academic</option>
			<option value="acaC">Level C academic</option>
			<option value="acaD">Level D academic</option>
			<option value="acaE">Level E academic</option>
		</select></label>
		<label>Inflation rate: <input type="text" value={100*inflationRate} onChange={(e) => setInflationRate((e.target.value as any as number)/100)} />% (after June 2024)</label>
		<input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> Show every fortnight (not just pay bumps)
		<h2>Table of values</h2>
		<TableOfValues
			startDate={startDate}
			cpiSeries={cpiSeries}
			paygrade={paygrade}
			showAll={showAll}
			inflationRate={inflationRate}
		/>
	</main>
	);
}

export default App;
