import React from 'react';
import dotnetify from 'dotnetify';
import { Bar } from 'react-chartjs-2';

export default class LiveChart extends React.Component {
	constructor(props) {
		super(props);
		this.vm = dotnetify.react.connect('LiveChart', this);
		this.state = { data: Array(10) };
	}

	componentWillUnmount() {
		this.vm.$destroy();
	}

	shouldComponentUpdate(_, nextState) {
		const value = nextState.NextValue;
		if (value !== this.state.NextValue) {
			this.setState({ data: [ ...this.state.data.slice(1), value ] });
		}
		return true;
	}

	render() {
		return <BarChart data={this.state.data} />;
	}
}

const BarChart = ({ data }) => {
	let chartData = {
		labels: Array(10).fill(''),
		datasets: [
			{
				label: '',
				data: data,
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: [ 'rgba(75, 192, 192, 1)' ]
			}
		]
	};

	const chartOptions = {
		responsive: true,
		legend: { display: false },
		scaleOverride: true,
		scaleSteps: 5,
		scaleStepWidth: 10
	};

	return <Bar data={chartData} options={chartOptions} />;
};
