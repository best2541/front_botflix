import './App.css';
import React from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10]
    },
    {
      label: 'Dataset 2',
      data: [20, 33]
    },
  ],
};

function App() {
  const [datas, setDatas] = React.useState([])

  const getGraph = () => {
    axios.get('http://localhost:3001/get')
      .then(result => {
        setDatas(result.data.graph)
        console.log(result.data.graph)
      })
  }
  const test2 = () => {
    axios.get('http://localhost:3001/test2')
      .then(result => console.log(result.data))
  }

  return (
    <div className="">
      <header className="">
        <button onClick={() => getGraph()}>Gen</button>
        <button onClick={() => console.log(datas)}>datas check</button>
        <button onClick={() => test2()}>test2</button>

        {datas?.map(data => (
          <>
            <h2>{data.accounts}</h2>
            <div
              style={{
                width: '50%',
                height: '50vh'
              }}
            >
              {datas?.length > 0 &&
                <>
                  <Bar data={{
                    labels: JSON.parse(data.dailyGain)?.map((y) => (y[0].date)),
                    datasets:
                      [
                        {
                          label: 'gain profit',
                          data: JSON.parse(data.dailyGain)?.map((y) => y[0].profit)
                        },
                        {
                          label: 'gain value',
                          data: JSON.parse(data.dailyGain)?.map((y) => y[0].value)
                        },
                        {
                          label: 'balance',
                          data: JSON.parse(data.dataDaily)?.map((y) => y[0].balance)
                        },
                        {
                          label: 'pips',
                          data: JSON.parse(data.dataDaily)?.map((y) => y[0].pips)
                        },
                        {
                          label: 'growthEquity',
                          data: JSON.parse(data.dataDaily)?.map((y) => y[0].growthEquity)
                        }
                      ]
                  }} />
                </>
              }
            </div>
          </>
        ))}
      </header>
    </div>
  );
}

export default App;
