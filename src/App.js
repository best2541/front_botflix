import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-charts'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

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
  const imageRef = React.useRef();
  const [datas, setDatas] = React.useState([])
  const [dataSet, setDataset] = React.useState([])

  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const getGraph = () => {
    axios.get('http://localhost:3001/get')
      .then(result => {
        // console.log(result.data.graph?.map(set => console.log({
        //   labels: set.accounts,
        //   datasets: ''
        // })))
        // setDataSet()
        setDatas(result.data.graph)
        console.log(result.data.graph)
        //   setDatas(result.data.graph.filter(x => x.dailyGain).map(x => {
        //   const graph = JSON.parse(x.dailyGain)?.map((y, index) => [index, y[0].profit])
        //   return (
        //     {
        //       label: x.accounts,
        //       data: graph
        //     }
        //   )
        // }
        // ))
      })
  }
  const test2 = () => {
    axios.get('http://localhost:3001/test2')
      .then(result => console.log(result.data))
  }
  useEffect(() => {
    // axios.get('http://localhost:3001/test')
    //   .then(blob => {
    //     console.log(blob.data)
    //   })

    //test
    // const email = 'omesbooks@hotmail.com'
    // const password = 'meta5656'
    // axios.get(`https://www.myfxbook.com/api/login.json?email=${email}&password=${password}`)
    //   .then(result => {
    //     console.log(result.data)
    //     const session = result.data.session
    //     axios.get(`https://www.myfxbook.com/api/logout.json?session=${session}`)
    //       .then(result => {
    //         if (!result.data.error) {
    //           console.log('logouted')
    //         } else {
    //           console.log('logout fail')
    //         }
    //       })
    //   })
  }, [])
  return (
    <div className="">
      <header className="">
        <button onClick={() => getGraph()}>Gen</button>
        <button onClick={() => console.log(datas)}>check</button>
        <button onClick={() => test2()}>check</button>

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
                  <button onClick={() => console.log(JSON.parse(data.dailyGain)?.map((y) => y[0].profit))}>check</button>
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
                  {/* <Chart data={[data]} axes={axes} /> */}
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
