import React from 'react';
import logo from './logo.svg';
import './App.css';

function TableOfValues(props: {}) {
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
		</tbody>
	</table>;
}

function App() {
  return (<main>
	<h1>Swinburne EBA calculator</h1>
	<p>This application tells you how you fare given Swinburne’s pay rises.</p>
	<p>Note that it <b>doesn’t</b> take into account promotions or increases in increment (merit pay rises). These reflect your improved skills, performance and experience, rather than Swinburne increasing your salary.</p>
	<h2>Settings</h2>
	<label>Start date: <input type="date" /></label>
	<label>CPI group: <select>
		<option value="melbourne">Melbourne</option>
		<option value="australia">Australia-wide</option>
		<option value="brisbane">Brisbane</option>
	</select></label>
	<label>Pay grade: <select>
		<option value="index">Index ($100)</option>
		<option value="hew7">HEW 7</option>
		<option value="hew8">HEW 8</option>
	</select></label>
	<h2>Table of values</h2>
	<TableOfValues />
	</main>
  );
}

export default App;
