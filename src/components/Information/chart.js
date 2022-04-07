import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

let Chart = (props) => {
    let labels = []
    let data = []
    for (let i = 0; i < 51; i++) {
        labels.push(i + 1);
        data.push(props.function(i + 1));
    }

    return (
        <Line
            data={{
                labels: labels,
                datasets: [{
                    label: props.label,
                    data: data,
                    fill: false,
                    display: false,
                    pointRadius: 0,
                    backgroundColor: 'white',
                    borderColor: '#b0b0b0',
                }],
            }}
            options={{
                scales: {
                    x: {
                        grid: {
                            color: '#5b5b5b'
                        },
                        ticks: {
                            maxTicksLimit: 10,
                            color: 'white'
                            // display: false
                        }
                    },
                    y: {
                        grid: {
                            color: '#5b5b5b'
                        },
                        ticks: {
                            count: 4,
                            color: 'white'
                            // display: false
                        }
                    }
                },
                showTooltips: false,
                events: [],
            }}
        />
    );
}

export default Chart;