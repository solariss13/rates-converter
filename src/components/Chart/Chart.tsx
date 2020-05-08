import React from 'react';
import { Line } from 'react-chartjs-2';

export interface ChartPropTypes {
  dates: Array<string> | undefined;
  rates: Array<number> | undefined;
}


const Chart: React.FC<ChartPropTypes> = ({ dates, rates }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Rates',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.8)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: rates,
      },
    ],
  };

  return (
      <Line
        data={data}
      />
  );
};

export default Chart;
