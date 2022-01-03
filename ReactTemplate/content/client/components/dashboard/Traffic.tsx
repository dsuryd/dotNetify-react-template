import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import purple from "@material-ui/core/colors/purple";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const useStyles = makeStyles({
  card: {
    backgroundColor: purple[500],
    height: 150
  },
  header: {
    fontSize: 24,
    color: "white",
    backgroundColor: purple[600],
    padding: 10
  },
  body: {
    height: 95,
    padding: "5px 15px 0 15px"
  }
});

const chartOptions = {
  plugins: {
    legend: { display: false }
  },
  scales: { xAxis: { ticks: { display: false } }, yAxis: { ticks: { display: false } } },
  layout: { padding: { left: 5, right: 5, top: 5, bottom: 5 } },
  maintainAspectRatio: false
};

export interface ITrafficProps {
  data: number[];
}

export default function Traffic(props: ITrafficProps) {
  const classes = useStyles({});
  const data = {
    labels: props.data.map(_ => ""),
    datasets: [
      {
        data: props.data,
        fill: false,
        backgroundColor: "white",
        borderColor: "#8884d8",
        borderWidth: 2,
        pointBorderWidth: 2
      }
    ]
  };

  return (
    <Card className={classes.card}>
      <div className={classes.header}>Traffic</div>
      <div className={classes.body}>
        <Line data={data} options={chartOptions} />
      </div>
    </Card>
  );
}
