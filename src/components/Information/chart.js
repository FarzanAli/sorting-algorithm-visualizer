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
    console.log(labels)
    console.log(data);

    return (
        <Line
            data={{
                labels: labels,
                datasets: [{
                    label: props.label,
                    data: data,
                    fill: false,
                    display: false,
                    pointRadius: 1
                }]
            }}
            options={{
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 10,
                            // display: false
                        }
                    },
                    y: {
                        ticks: {
                            count: 4,
                            // display: false
                        }
                    }
                },
                // showTooltips: false,
                // events: [],
            }}
        />
    );
}

export default Chart;