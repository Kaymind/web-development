import React, { Component } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: "bar"
    };
  }

  render() {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Revenue 2019",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "#f00",
          borderColor: "#777",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            0,
            1000000,
            2002000,
            3000000,
            2000000,
            3000000,
            4000000,
            4500000
          ]
        },
        {
          label: "Revenue 2018",
          fill: true,
          lineTension: 0.1,
          backgroundColor: [
            "#f00",
            "#ff0",
            "#fa0",
            "#f0f",
            "#a00",
            "#f40",
            "#faf"
          ],
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            199990,
            1000000,
            5002000,
            3000000,
            2000000,
            3000000,
            4000000,
            4500000
          ]
        }
      ]
    };

    const chartOption = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            }
          }
        ]
      }
    };

    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Chart
            <small>Sales</small>
          </h1>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-info"
              onClick={() => this.setState({ chartType: "line" })}
            >
              Line
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => this.setState({ chartType: "bar" })}
            >
              Bar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => this.setState({ chartType: "pie" })}
            >
              Pie
            </button>
          </div>

          <div style={{ height: 500 }}>
            {this.state.chartType === "line" && (
              <Line data={data} width={100} height={50} options={chartOption} />
            )}
            {this.state.chartType === "pie" && (
              <Pie data={data} width={100} height={50} options={chartOption} />
            )}
            {this.state.chartType === "bar" && (
              <Bar data={data} width={100} height={50} options={chartOption} />
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default Report;
